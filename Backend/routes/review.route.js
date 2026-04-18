import express from 'express'
import { jwtVerfiy } from '../middleware/jwt.js'
import { createReview, getReview } from "../controllers/review.controller.js"

const Router = express.Router()

Router.post("/", jwtVerfiy, createReview)
Router.get("/:gigId", getReview)

export default Router