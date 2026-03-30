import express from 'express'
import dotenv from 'dotenv'
import DBconnect from './DB/db.js'

dotenv.config()

const app = express()

DBconnect()

const PORT = process.env.PORT || 8000

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.listen(PORT, () => {
    console.log(`App is Listening on the PORT http://localhost:${PORT}`)
})