import Stripe from 'stripe'
import Gig from '../Models/gig.model.js'
import Orders from "../Models/order.model.js"

const stripe = new Stripe(process.env.STRIPE_KEY)

export const intent = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id)

    const paymentIntent = await stripe.paymentIntents.create({
      amount: gig.price * 100,
      currency: "inr",
      automatic_payment_methods: {
        enabled: true
      }
    })
    const newOrder = new Orders({
      gigId: gig._id,
      title: gig.title,
      price: gig.price,
      sellerId: gig.userId,
      buyerId: req.id,
      payment_intent: paymentIntent.id
    })

    await newOrder.save()

    return res.status(200).send({ clientSecret: paymentIntent.client_secret })

  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error", error: error.message })
  }
}

export const getOrders = async (req, res)=>{
  try {
    const orders = await Orders.find({
      ...(req.isSeller ? {sellerId: req.id}: {buyerId: req.id}),
      isCompleted: true
    })
    return res.status(200).send(orders)

  } catch (error) {
    return res.status(500).send({message: "Internal Server Error", error: error.message})
  }
}

export const confirmOrder = async (req, res)=>{
try {
  await Orders.findOneAndUpdate(
    {payment_intent: req.body.payment_intent},
      {$set: {isCompleted: true}}
  )

  return res.status(200).send("Payment Successful")

} catch (error) {
  return res.status(500).send({message: "Internal Server Error", error: error.message})
}
}