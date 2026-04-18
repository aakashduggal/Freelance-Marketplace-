import redisClient from "../DB/redis.js";


export const publishEvent = async (channelName, messageData)=>{
  try {
    await redisClient.publish(channelName, JSON.stringify(messageData))
    console.log(`Message was successfully sent to the Box: ${channelName}`)
  } catch (error) {
    console.log("Error while sending message in queue", error.message)
  }
}