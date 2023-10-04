import express from "express";
import { createUser, getUserByEmail } from "../db/users";
import { random, authenticate } from "../helper/index";

export const login = async(req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body
    if(!email || !password){
      return res.sendStatus(400)
    }

    const user = await getUserByEmail(email).select('+authentication.salt +authentication.password')
    if(!user){
      console.log("User not found")
      return res.sendStatus(400)
    }

    const expectedHash = authenticate(user.authentication?.salt? user.authentication?.salt : "", password)
    if(user.authentication?.password !== expectedHash){
      console.log("Wrong Password")
      return res.sendStatus(400)
    }

    const salt = random()
    user.authentication.sessionToken = authenticate(salt, user._id.toString())
    await user.save()

    res.cookie(`${user.username.toUpperCase()}-AUTH`, user.authentication.sessionToken, {domain: 'localhost', path: '/'})
    return res.status(200).json(user).end()
  } catch (error) {
    console.log(error)
    return res.sendStatus(400);
  }
}

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      return res.sendStatus(400);
    }
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.sendStatus(400);
    }
    const salt = random()
    const user = await createUser({ email, username, authentication: {
        salt,
        password: authenticate(salt, password)
    } })
    return res.status(201).json(user)
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};
