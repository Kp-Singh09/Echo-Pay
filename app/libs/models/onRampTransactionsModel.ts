import mongoose from "mongoose";

const onRampTransactionsSchema = new mongoose.Schema({
    status: {
        type: String,
        required: true,
    },
    bank: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    timeStamp: {
        type: Date,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, { timestamps: true });

const OnRampTransactions = mongoose.models.OnRampTransactions || mongoose.model("OnRampTransactions", onRampTransactionsSchema);

export default OnRampTransactions;