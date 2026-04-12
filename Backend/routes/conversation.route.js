import express from "express"
import { jwtVerfiy } from "../middleware/jwt.js"
import { createConversation, getConversations, getSingleConversation, updateConversation } from "../controllers/conversation.controller.js"

const Router = express.Router()

Router.post("/", jwtVerfiy, createConversation)
Router.get("/", jwtVerfiy, getConversations)
Router.get("/single/:id", jwtVerfiy, getSingleConversation)
Router.patch('/update/:id', jwtVerfiy, updateConversation)

export default Router