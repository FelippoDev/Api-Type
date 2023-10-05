import express from 'express'
import { get, merge } from 'lodash'
import { getUserBySessionToken } from '../db/users'


export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { pk } = req.params
        const currentUser = get(req, 'user') as any 
      
        if(!currentUser || pk !== currentUser._id.toString()){
            return res.status(403).json({"body": "Not Authorized."})
        }
        return next()
    } catch (error) {
        console.log(error)
        return res.status(403).json({"body": "Not Authorized."})
    }
}

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const sessionToken = req.cookies['API-AUTH']
        if(!sessionToken){
            return res.status(401).json({"body": "Invalid auth token."})
        }
        const existingUser = await getUserBySessionToken(sessionToken)
        if(!existingUser){
            return res.status(401).json({"body": "Invalid auth token."})
        }

        merge(req, { user: existingUser})
 
        return next()

    } catch (error) {
        console.log(error)
        return res.status(401).json({"body": "Invalid auth token."})
    }
}
