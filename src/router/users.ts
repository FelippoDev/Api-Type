import express from "express"
import { users, userDetail, userDelete } from "../controllers/users"
import { isAuthenticated } from "../middleware/index"

export default (router: express.Router): void => {
    router.get("/users", isAuthenticated, users)
    router.get("/users/:pk", isAuthenticated, userDetail)
    router.delete("/users/:pk", isAuthenticated, userDelete)
}