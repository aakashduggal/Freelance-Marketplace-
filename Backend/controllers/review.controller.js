import Gig from "../Models/gig.model.js"
import Order from "../Models/order.model.js"
import Review from "../Models/review.model.js"

export const createReview = async (req, res)=>{
   try {
    if(req.isSeller){
        return res.status(403).send("Sellers can't create a review!")
    }

    const order = await Order.findOne({
        gigId: req.body.gigId,
        buyerId: req.id,
        isCompleted: true
    })

    if(!order){
        return res.status(403).send("You haven't completed an order for this gig.")
    }

    const reviewExist = await Review.findOne({
        gigId: req.body.gigId,
        userId: req.id
    })

    if (reviewExist) return res.status(403).send("You have already reviewed this gig!")

   const review = new Review({
        gigId: req.body.gigId,
        userId: req.id,
        star: req.body.star,
        desc: req.body.desc
    })

    await Gig.findByIdAndUpdate(req.body.gigId, {
        $inc: 
          { totalStars: req.body.star, starNumber: 1 }  
    })

   await review.save()    
   return res.status(200).send(review)

   } catch (error) {
    return res.status(500).send({message: "Internal Server Error", error:error.message})
   }
}

export const getReview = async (req, res)=>{
    try {
        const review = await Review.find({gigId: req.params.gigId})
        
        if(!review){
            return res.status(403).send("No review found")
        }

        if(review){
            return res.status(200).send(review)
        }

    } catch (error) {
        return res.status(500).send({message: "Internal Server Error", error: error.message})
    }
}