import mongoose from "mongoose";

const balanceSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, { timestamps: true });

const Balance = mongoose.models.Balance || mongoose.model("Balance", balanceSchema);

export default Balance;

