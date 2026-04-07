import express from 'express'
import {jwtVerfiy} from "../middleware/jwt.js"
import {intent, getOrders, confirmOrder} from "../controllers/order.controller.js"

const Router = express.Router()

Router.post("/create-payment-intent/:id", jwtVerfiy, intent)
Router.get("/", jwtVerfiy, getOrders)
Router.put("/", jwtVerfiy, confirmOrder)

export default Router