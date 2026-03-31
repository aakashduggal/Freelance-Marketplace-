import { createClient } from 'redis'
import dotenv from 'dotenv'

dotenv.config()

const redisClient = createClient({
  url: process.env.REDIS_URL
})

redisClient.on('error', (err) => console.log("Redis Client error:", err))
redisClient.on('connect', () => console.log("redis connected successfuly"))


  try {
    await redisClient.connect()
  } catch (error) {
    console.log("Redis Connection Failed", error.message)
  }


export default redisClient