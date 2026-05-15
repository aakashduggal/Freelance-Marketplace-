import { rateLimit } from 'express-rate-limit'
import { RedisStore } from 'rate-limit-redis'
import redisClient from '../DB/redis.js'


export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    store: new RedisStore({
        sendCommand: (...args) => redisClient.sendCommand(args)
    }),

    message: "Too many authentication attempts from this IP, please try again after 15 minutes"

})

