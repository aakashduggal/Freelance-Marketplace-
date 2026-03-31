import user from "../Models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import dotenv from "dotenv";

dotenv.config();

export const register = async (req, res) => {
  const { username, email, password, isSeller } = req.body
  if (!username) {
    return res.status(400).send('username is required')
  }
  if (!email) {
    return res.status(400).send('email is required')
  }
  if (!password) {
    return res.status(400).send('password is required')
  }

 try {
     const finduser = await user.findOne({username})
   
     if (finduser) {
       return res.status(400).send("User already exists")
     }
   
     const hashedPassword = bcrypt.hashSync(password, 10)
   
     const User = new user({
       username,
       email,
       password: hashedPassword,
       isSeller
     })
   
     await User.save()
   
    return res.status(200).send("User has been Created successfully")
 } catch (error) {
    console.log(error)
    return res.status(500).send("Internal Server Error")
 }

}

export const login = async (req, res)=>{
const {username, password} = req.body

try {
  const findUser = await user.findOne({username})
  if(!findUser){
    return res.status(400).send("Authenticate first before login")
  }
  
  const correctPassword = bcrypt.compareSync(password, findUser.password)
  if(!correctPassword){
    return res.status(400).send("Please enter correct credentials")
  }
  
  const Token = jwt.sign({id: findUser._id, isSeller: findUser.isSeller}, process.env.JWT_KEY)

  const {password: dbPassword, ...finalUser} = findUser._doc
  
  res.cookie("accessToken", Token, {httpOnly: true}).status(200).send({finalUser})
} catch (error) {
  console.log(error)
  res.status(500).send("Interval Server Error")
}

}