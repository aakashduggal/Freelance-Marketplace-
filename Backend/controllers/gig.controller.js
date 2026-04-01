import Gig from "../Models/gig.model.js"


export const createGig = async (req, res)=>{

   try {
     if(!req.isSeller){
         return res.status(401).send("Only sellers can create a gig!")
     }
 
     const newGig = new Gig({userId: req.id, ...req.body})
     await newGig.save()

     return res.status(201).send(newGig)
   } catch (error) {
     return res.status(500).send("Internal Server Error While Creating Gig")
   }

}

export const deleteGig = async (req, res)=>{
    try {
        const gig = await Gig.findById(req.params.id)
        
        if(!gig){
            return res.status(401).send("Gig not found")
        }
        if(gig.userId !== req.id){
            return res.status(403).send("You can only delete your own gig!")
        }
        await Gig.findByIdAndDelete(req.params.id)
        return res.status(200).send("Gig has been deleted successfully")
    } catch (error) {
        return res.status(500).send("Internal Server Error while deleting Gig")
    }
}