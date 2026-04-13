import express from 'express'
import dotenv from 'dotenv'
import DBconnect from './DB/db.js'
import authRoute from "./routes/auth.route.js"
import "./DB/redis.js"
import cookieParser from 'cookie-parser'
import gigRoute from './routes/gig.route.js'
import orderRoute from "./routes/order.route.js"
import conversationRoute from "./routes/conversation.route.js"
import messageRoute from "./routes/message.route.js"
import http from 'http'
import { Server } from 'socket.io'

dotenv.config()

const app = express()
app.use(express.json())
app.use(cookieParser())

DBconnect()

const server = http.createServer(app)
const io = new Server(server,{
    cors:{
        origin: "http://localhost:3000"
    }
})

// . Online Users Track Karne ka Engine
let users = []

const addUser = (userID, socketID)=>{
    !users.some((user)=> user.userID === userID) && users.push({userID, socketID})
}

const removeUser = (socketID)=>{
   users = users.filter((user)=> user.socketID !== socketID)
}

const getUser = (userID)=>{
    return users.find((user)=> user.userID === userID)
}

const PORT = process.env.PORT || 8000

app.use((req, res, next)=>{
    req.io = io
    next()
})

app.use("/api/auth", authRoute)
app.use("/api/gigs", gigRoute)
app.use("/api/orders", orderRoute)
app.use("/api/conversation", conversationRoute)
app.use("/api/message", messageRoute)

server.listen(PORT, () => {
    console.log(`App is Listening on the PORT http://localhost:${PORT}`)
})