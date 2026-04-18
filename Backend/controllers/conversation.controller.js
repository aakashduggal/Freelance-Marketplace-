import Conversation from "../Models/conversation.model.js"

export const createConversation = async (req, res) => {
  try {
    const newConversation = new Conversation({
      id: req.isSeller ? req.id + req.body.to : req.body.to + req.id,
      sellerId: req.isSeller ? req.id : req.body.to,
      buyerId: req.isSeller ? req.body.to : req.id,

      readBySeller: req.isSeller,
      readByBuyer: !req.isSeller
    })

    const convo = await newConversation.save()

    return res.status(200).send(convo)
  } catch (error) {
    if (error.code === 11000) return res.status(403).json("Conversation already exists!");
    return res.status(500).send({ message: "Internal Server Error", error: error.message });
  }

}

export const getConversations = async (req, res) => {
  try {
    const convo = await Conversation.find(
      req.isSeller ? { sellerId: req.id } : { buyerId: req.id }
    ).sort({ updatedAt: -1 })

    return res.status(200).send(convo)
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error", error: err.message });
  }
}

export const getSingleConversation = async (req, res) => {
  try {
    const convo = await Conversation.findOne({ id: req.params.id })
    if (!convo) {
      return res.status(404).send("Conversation Not Exists")
    }
    return res.status(200).send(convo)
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error", error: error.message })
  }
}

export const updateConversation = async (req, res) => {
  try {
    const convo = await Conversation.findOneAndUpdate(
      { id: req.params.id },
      { $set: { ... (req.isSeller ? { readByBuyer: req.id } : { readByBuyer: req.id }) } },
      { new: true }
    )
    if (!convo) {
      return res.status(404).send("Conversation Not Exists")
    }
    return res.status(200).send(convo)
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error", error: error.message })
  }
}