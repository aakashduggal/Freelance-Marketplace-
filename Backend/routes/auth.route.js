import express from "express"
import { register } from "../controllers/auth.controller.js"
import { login } from "../controllers/auth.controller.js"
import { authLimiter } from "../middleware/rateLimiter.js"

const router = express.Router()


router.post("/register", authLimiter, register)

router.post("/login", authLimiter, login)

export default router