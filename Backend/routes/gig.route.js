import express from "express"
import {createGig, deleteGig, getGig, getGigs} from '../controllers/gig.controller.js'
import {jwtVerfiy} from '../middleware/jwt.js'


const router = express.Router()

router.post("/", jwtVerfiy, createGig)
router.delete("/:id", jwtVerfiy, deleteGig)
router.get("/:id", getGig)
router.get("/", getGigs)

export default router