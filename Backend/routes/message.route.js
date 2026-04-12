import express from "express"
import { jwtVerfiy } from "../middleware/jwt.js"
import { createMessage, getMessages } from "../controllers/message.controller.js"

const Router = express.Router()

Router.post("/", jwtVerfiy, createMessage)
Router.get("/getMessage/:id", jwtVerfiy, getMessages)

export default Router
