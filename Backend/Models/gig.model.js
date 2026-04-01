import mongoose, {Schema} from 'mongoose'

const gigSchema = new Schema({
 userId: { type: String, required: true },
    title: { type: String, required: true },
    desc: { type: String, required: true },
    totalStars: { type: Number, default: 0 },
    starNumber: { type: Number, default: 0 }, // Kitne logo ne review diya
    cat: { type: String, required: true }, // Category (logo design, web dev etc)
    price: { type: Number, required: true },
    cover: { type: String, required: true }, // Main image url
    images: { type: [String], required: false }, // Extra images array
    shortTitle: { type: String, required: true },
    shortDesc: { type: String, required: true },
    deliveryTime: { type: Number, required: true }, // In days
    revisionNumber: { type: Number, required: true },
    features: { type: [String], required: false },
    sales: { type: Number, default: 0 }
},{
    timestamps:true
})

export default mongoose.model('Gig', gigSchema)