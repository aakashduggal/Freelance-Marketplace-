import mongoose, {Schema} from 'mongoose'

const orderSchema = new Schema({

    gigId:{
        type: Schema.Types.ObjectId,
        ref: 'Gig',
        required: true
    },
    title:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    sellerId:{
       type: Schema.Types.ObjectId,
       ref: 'User',
       required: true
    },
    buyerId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    payment_intent:{
        type: String,
        required: true
    }
},{
    timestamps: true
})

export default mongoose.model('Orders', orderSchema)