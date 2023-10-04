import express from "express"
import authentication from "./authentication"

const authRouter = express.Router()

export default (): express.Router => {
    authentication(authRouter)
    return authRouter
}