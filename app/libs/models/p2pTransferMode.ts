import mongoose from "mongoose"

const p2pTransferSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    sender: {
        type: String,
        required: true,
    },
    receiver: {
        type: String,
        required: true,
    },
    timeStamp: {    
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        required: true,
       
    },
}, { timestamps: true });

const P2PTransfer = mongoose.models.P2PTransfer || mongoose.model("P2PTransfer", p2pTransferSchema);

export default P2PTransfer;