import mongoose, { Schema } from 'mongoose';

const conversationSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true, 
    },
    sellerId: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
    },
    buyerId: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
    },
    readBySeller: {
        type: Boolean,
        default: false,
    },
    readByBuyer: {
        type: Boolean,
        default: false,
    },
    lastMessage: {
        type: String,
        required: false,
    }
}, {
    timestamps: true 
});

export default mongoose.model('Conversation', conversationSchema);
