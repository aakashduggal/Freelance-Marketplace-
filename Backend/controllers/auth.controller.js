import user from "../Models/user.model.js"
import bcrypt from "bcryptjs"

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