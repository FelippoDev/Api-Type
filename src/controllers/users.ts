import express from "express";
import { getUsers, getUserById, deleteUserById } from "../db/users";

export const users = async (req: express.Request, res: express.Response) => {
    try {
        const dataUsers = await getUsers()
        return res.status(200).json(dataUsers)
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}

export const userDetail = async (req:express.Request, res:express.Response) => {
    try {
        const { pk } = req.params
        const existingUser = await getUserById(pk)
        if(!existingUser){
            return res.status(404).json({body: "User not found."})
        }
        return res.status(200).json(existingUser)
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}

export const userDelete = async (req:express.Request, res:express.Response) => {
    try {
        const { pk } = req.params
        await deleteUserById(pk)
        return res.sendStatus(204)
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}