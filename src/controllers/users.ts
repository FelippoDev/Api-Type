import express from "express";
import { getUsers } from "../db/users";

export const users = async (req: express.Request, res: express.Response) => {
    try {
        const dataUsers = await getUsers()
        return res.status(200).json(dataUsers)
    } catch (error) {
        console.log(error)
        return res.sendStatus(401)
    }
}