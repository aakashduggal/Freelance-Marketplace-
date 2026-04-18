import { Client } from '@elastic/elasticsearch'
import dotenv from 'dotenv'

dotenv.config()

export const elesticClient = new Client({
    node: process.env.ELASTICSEARCH_URL
})

export const checkElesticConnection = async ()=>{
    try {
        const health = await elesticClient.cluster.health({})
        console.log("ElesticSearch Cloud Connection is successful, elestic health :", health.body.status)
    } catch (error) {
        console.error("ElesticSearch Connection is failed, error:", error.message)
    }
}
