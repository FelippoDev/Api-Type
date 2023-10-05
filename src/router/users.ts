import express from "express"
import { users } from "../controllers/users"

export default (router: express.Router): void => {
    router.get("/users", users)
}