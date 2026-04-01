import express from 'express'
import dotenv from 'dotenv'
import DBconnect from './DB/db.js'
import authRoute from "./routes/auth.route.js"
import "./DB/redis.js"
import cookieParser from 'cookie-parser'
import gigRoute from './routes/gig.route.js'

dotenv.config()

const app = express()
app.use(express.json())
app.use(cookieParser())

DBconnect()

const PORT = process.env.PORT || 8000

app.use("/api/auth", authRoute)
app.use("/api/gigs", gigRoute)

app.listen(PORT, () => {
    console.log(`App is Listening on the PORT http://localhost:${PORT}`)
})