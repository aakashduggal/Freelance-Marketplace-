import Conversation from "../Models/conversation.model.js"

export const createConversation = async (req, res) => {
  try {
    let sellerId = req.body.sellerId;
    let buyerId = req.body.buyerId;

    if (!sellerId || !buyerId) {
        sellerId = req.isSeller ? req.id : req.body.to;
        buyerId = req.isSeller ? req.body.to : req.id;
    }

    const conversationId = req.body.id || (sellerId + buyerId);

    const newConversation = new Conversation({
      id: conversationId,
      sellerId: sellerId,
      buyerId: buyerId,

      readBySeller: req.id === sellerId,
      readByBuyer: req.id === buyerId
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
    )
      .populate("sellerId", "username email isSeller")
      .populate("buyerId", "username email isSeller")
      .sort({ updatedAt: -1 })

    return res.status(200).send(convo)
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error", error: err.message });
  }
}

export const getSingleConversation = async (req, res) => {
  try {
    const convo = await Conversation.findOne({ id: req.params.id })
      .populate("sellerId", "username email isSeller")
      .populate("buyerId", "username email isSeller");
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
      { $set: { ...(req.isSeller ? { readBySeller: true } : { readByBuyer: true }) } },
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