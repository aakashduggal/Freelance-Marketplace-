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
import reviewRouter from './routes/review.route.js'
import {checkElesticConnection} from "./utils/elasticsearch.js"

dotenv.config()

const app = express()
app.use(express.json()) 
app.use(cookieParser())

DBconnect()
checkElesticConnection()

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000"
    }
})

// . Online Users Track Karne ka Engine
let users = []

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) && users.push({ userId, socketId })
}

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId)
}

const getUser = (userId) => {
    return users.find((user) => user.userId === userId)
}

io.on("connection", (socket) => {
    console.log("A new user is connected", socket.id)

    socket.on("addUser", (userId) => {
        addUser(userId, socket.id)
        io.emit("getUsers", users)
    })

    socket.on("sendMessage", ({ senderId, receiverId, desc }) => {
        const user = getUser(receiverId)
        if (user) {
            io.to(user.socketId).emit("getMessage", {
                senderId,
                desc
            })
        }
    })

    socket.on("disconnect", () => {
        console.log("User Disconnected")
        removeUser(socket.id)
        io.emit("getUsers", users)
    })
})

const PORT = process.env.PORT || 8000

app.use((req, res, next) => {
    req.io = io
    next()
})

app.use("/api/auth", authRoute)
app.use("/api/gigs", gigRoute)
app.use("/api/orders", orderRoute)
app.use("/api/conversation", conversationRoute)
app.use("/api/message", messageRoute)
app.use("/api/review", reviewRouter)

server.listen(PORT, () => {
    console.log(`App is Listening on the PORT http://localhost:${PORT}`)
})