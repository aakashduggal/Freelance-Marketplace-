import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const jwtVerfiy = (req, res, next) => {
    try {
        let token = req.cookies.accessToken || req.cookies.accesstoken

        if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res.status(401).send("You are not logged in")
        }

        const verifyToken = jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
            if (err) {
                return res.status(403).send("Token has been expire")
            }
            req.id = payload.id
            req.isSeller = payload.isSeller

            next()
        })

    } catch (error) {
        return res.status(500).send({ message: "Internal Server Error", error: error.message })
    }

}