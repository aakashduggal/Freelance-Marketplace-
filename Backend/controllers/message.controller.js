import Conversation from '../Models/conversation.model.js'
import Message from '../Models/message.model.js'

export const createMessage = async (req, res)=>{
   try {
    const msg = new Message({
      conversationId : req.body.conversationId,
      userId: req.id,
      desc: req.body.desc
    })
    const newMsg = await msg.save()
    await Conversation.findOneAndUpdate(
     {id: req.body.conversationId},
     {$set:{
       lastMessage: req.body.desc,
       readBySeller: req.isSeller,
       readByBuyer: !req.isSeller
     }},
      {new: true}
    )
    return res.status(200).send(newMsg)
   } catch (error) {
    return res.status(500).send({message: "Internal Server Error", error: error.message})
   }
}

export const getMessages = async (req, res)=>{
    try {
        const message = await Message.find({conversationId: req.params.id})
        if(!message){
            return res.status(404).send("No Message Available")
        }
        return res.status(200).send(message)
    } catch (error) {
        return res.status(500).send({message: "Internal Server Error", error: error.message})        
    }
}