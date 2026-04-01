import express from "express"
import {createGig, deleteGig} from '../controllers/gig.controller.js'
import {jwtVerfiy} from '../middleware/jwt.js'


const router = express.Router()

router.post("/create", jwtVerfiy, createGig)
router.delete("/delete/:id", jwtVerfiy, deleteGig)

export default router