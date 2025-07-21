import { NextRequest, NextResponse } from "next/server";
import User from "@/app/libs/models/userModel";
import Balance from "@/app/libs/models/BalanceModel";
import dbConnect from "@/app/libs/mongoDB";
import OnRampTransactions from "@/app/libs/models/onRampTransactionsModel";
import mongoose from "mongoose";
import P2PTransfer from "@/app/libs/models/p2pTransferMode";

export async function POST(req: NextRequest) {
    const { method, dataBody, type, auth } = await req.json();
    let responseData = null;

    try {
        // Connect to the database
        await dbConnect();

        switch (type) {
            case 'account-details':{
                const { id } = dataBody;
                const user = await User.findOne({ _id: id });
                if (!user) {    
                    responseData = { error: 'User not found', status: 400 };
                    return NextResponse.json(responseData);
                }

                const balance = await Balance.findOne({ userId: id });

                responseData = { message: 'Account details fetched successfully', status: 200, data: { id: user._id, phone: user.number, balance: balance.amount } };
                return NextResponse.json(responseData);
                break;
            }



            case 'transfer':{
                const { amount, bank, id } = dataBody;
                const user = await User.findOne({ _id: id });
                if (!user) {
                    responseData = { error: 'Invalid user', status: 400 };
                    return NextResponse.json(responseData);
                }
                if(amount > 100000){
                    const onRampTransactions = new OnRampTransactions({
                        timeStamp: new Date(),
                        status: "failed",
                        amount: amount,
                        bank: bank,
                        userId: id,
                    });
                    await onRampTransactions.save();
                    responseData = { error: 'Amount must be less than 100000', status: 400 };
                    return NextResponse.json(responseData);
                }

                    const balance = await Balance.findOne({ userId: id });
                    balance.amount += amount;
                    await balance.save();
                    const onRampTransactions = new OnRampTransactions({
                    timeStamp: new Date(),
                    status: "success",
                    amount: amount,
                    bank: bank,
                    userId: id,
                });
                await onRampTransactions.save();
                responseData = { message: 'Money added successfully', status: 200 };
                return NextResponse.json(responseData);
                break;
            }




            case 'p2p':{
                const { amount, phoneNumber, id } = dataBody;
                const user = await User.findOne({ _id: id });
                if (!user) {
                    responseData = { error: 'User not found', status: 400 };
                    return NextResponse.json(responseData);
                }
                const user2 = await User.findOne({ number: phoneNumber });
                if (!user2) {
                    responseData = { error: 'Wrong mobile number', status: 400 };
                    return NextResponse.json(responseData);
                }
                if(user._id === user2._id){
                    responseData = { error: 'You cannot transfer money to yourself', status: 400 };
                    return NextResponse.json(responseData);
                }
                const session = await mongoose.startSession();
                await session.startTransaction();
                try {
                    const balance = await Balance.findOne({ userId: id }).session(session);
                    if (balance.amount < amount) {
                        await session.abortTransaction();
                        const p2pTransfer = new P2PTransfer({
                            amount: amount,
                            sender: user.number,
                            receiver: user2.number,
                            timeStamp: new Date(),
                            status: "failed",
                        });
                        await p2pTransfer.save();
                        responseData = { error: 'Insufficient balance', status: 400 };
                        return NextResponse.json(responseData);
                    }
                    balance.amount -= amount;
                    await balance.save({ session });
                    
                    const balance2 = await Balance.findOne({ userId: user2._id }).session(session);
                    balance2.amount += amount;
                    await balance2.save({ session });
                    
                    await session.commitTransaction();
                    const p2pTransfer = new P2PTransfer({
                        amount: amount,
                        sender: user.number,
                        receiver: user2.number,
                        timeStamp: new Date(),
                        status: "success",
                    });
                    await p2pTransfer.save();
                } catch (error) {
                    await session.abortTransaction();
                    const p2pTransfer = new P2PTransfer({
                        amount: amount,
                        sender: user.number,
                        receiver: user2.number,
                        timeStamp: new Date(),
                        status: "failed",
                    });
                    await p2pTransfer.save();
                    throw error;
                } finally {
                    session.endSession();
                }
                responseData = { message: 'Money transferred successfully', status: 200 };
                return NextResponse.json(responseData);
                break;
            }

            case 'transactions':{
                const { id } = dataBody;
                const user = await User.findOne({ _id: id });
                const onRampTransactions = await OnRampTransactions.find({ userId: id });
                const p2pTransactions = await P2PTransfer.find({ $or: [{ sender: user.number }, { receiver: user.number }] });
                responseData = { message: 'Transactions fetched successfully', status: 200, data: { onRampTransactions: onRampTransactions, p2pTransactions: p2pTransactions } };   
                return NextResponse.json(responseData);
                break;
            }
            default:
                responseData = { error: 'Invalid request type', status: 400 };
                break;
        }

        return NextResponse.json(responseData);
    } catch (e: any) {
        return NextResponse.json(
            {
                message: 'Unauthorized Access',
            },
            {
                status: 401,
                statusText: 'Unauthorized Access',
            }
        );
    }
}


