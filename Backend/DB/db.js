import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const MongoID = process.env.MONGOID

const DBconnect = async ()=>{
    try {
        await mongoose.connect(MongoID)
        console.log("DB connected")
    } catch (error) {
        console.log('Failed to connect to DB :', error.message)
    }
}



export default DBconnect
