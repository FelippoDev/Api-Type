import express from "express"
import { users, userDetail, userDelete, userUpdate } from "../controllers/users"
import { isAuthenticated, isOwner } from "../middleware/index"

export default (router: express.Router): void => {
    router.get("/users", isAuthenticated, users)
    router.get("/users/:pk", isAuthenticated, userDetail)
    router.delete("/users/:pk", isAuthenticated, isOwner, userDelete)
    router.patch("/users/:pk", isAuthenticated, isOwner, userUpdate)
}