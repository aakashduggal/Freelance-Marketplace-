import express from "express"
import {createGig, deleteGig, getGig, getGigs} from '../controllers/gig.controller.js'
import {jwtVerfiy} from '../middleware/jwt.js'


const router = express.Router()

router.post("/create", jwtVerfiy, createGig)
router.delete("/delete/:id", jwtVerfiy, deleteGig)
router.get("/getGig/:id", getGig)
router.get("/getGigs", getGigs)

export default router