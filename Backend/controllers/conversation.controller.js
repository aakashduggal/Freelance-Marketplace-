import Conversation from "../Models/conversation.model.js"

export const createConversation = async (req, res)=>{
    try {
        const newConversation = await new Conversation({
            id: req.isSeller ? req.id + req.body.to : req.body.to + req.id,
            sellerId: req.isSeller ? req.id : req.body.to,
            buyerId : req.isSeller ? req.body.to : req.id,
    
            readBySeller: req.isSeller,
            readByBuyer : !req.isSeller
        })
    
        const convo = await newConversation.save()
    
        return res.status(200).send(convo)
    } catch (error) {
        if(err.code === 11000) return res.status(403).json("Conversation already exists!"); 
      return res.status(500).send({ message: "Internal Server Error", error: err.message });
  }

}





// export const getConversations = (req, res)=>{
//     const convo = Conversation.find
// }