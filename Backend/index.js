import express from 'express'
import dotenv from 'dotenv'
import DBconnect from './DB/db.js'
import authRoute from "./routes/auth.route.js"
import "./DB/redis.js"


dotenv.config()

const app = express()
app.use(express.json())

DBconnect()


const PORT = process.env.PORT || 8000

app.use("/api/auth", authRoute)


app.listen(PORT, () => {
    console.log(`App is Listening on the PORT http://localhost:${PORT}`)
})