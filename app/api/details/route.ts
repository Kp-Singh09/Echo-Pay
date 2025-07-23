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




            case 'transfer': {
  const { amount, bank, id } = dataBody;
  const user = await User.findOne({ _id: id });
  if (!user) {
    return NextResponse.json({ error: 'Invalid user', status: 400 });
  }

  if (amount > 100000) {
    const failedTx = new OnRampTransactions({ timeStamp: new Date(), status: "failed", amount, bank, userId: id });
    await failedTx.save();
    return NextResponse.json({ error: 'Amount must be less than 100000', status: 400 });
  }

  const balance = await Balance.findOne({ userId: id });
  balance.amount += amount;
  await balance.save();

  const onRampTx = new OnRampTransactions({ timeStamp: new Date(), status: "success", amount, bank, userId: id });
  await onRampTx.save();

  return NextResponse.json({
    message: 'Money added successfully',
    status: 200,
    newBalance: balance.amount, // ✅ send this
  });
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
            
        
        
            case 'p2p-sent-summary': {
    const { id } = dataBody;
    const user = await User.findOne({ _id: id });
    if (!user) {
        responseData = { error: 'User not found', status: 400 };
        return NextResponse.json(responseData);
    }

    // Aggregate all successful transfers sent by this user
    const summary = await P2PTransfer.aggregate([
        { $match: { sender: user.number, status: "success" } },
        {
            $group: {
                _id: "$receiver",
                totalAmount: { $sum: "$amount" },
            }
        },
        {
            $project: {
                receiver: "$_id",
                totalAmount: 1,
                _id: 0
            }
        }
    ]);

    responseData = {
        message: "Sent summary generated",
        status: 200,
        data: summary
    };
    return NextResponse.json(responseData);
    }





        case 'balance-history': {
    const { id } = dataBody;
    const user = await User.findOne({ _id: id });
    if (!user) {
        responseData = { error: 'User not found', status: 400 };
        return NextResponse.json(responseData);
    }

    const onRamps = await OnRampTransactions.find({ userId: id, status: "success" });
    const p2ps = await P2PTransfer.find({ 
        $or: [{ sender: user.number }, { receiver: user.number }],
        status: "success",
    });

    let events: { time: Date, delta: number }[] = [];

    for (let tx of onRamps) {
        events.push({ time: new Date(tx.timeStamp), delta: tx.amount });
    }

    for (let tx of p2ps) {
        if (tx.sender === user.number) {
            events.push({ time: new Date(tx.timeStamp), delta: -tx.amount });
        } else {
            events.push({ time: new Date(tx.timeStamp), delta: tx.amount });
        }
    }

    events.sort((a, b) => a.time.getTime() - b.time.getTime());

    let history = [];
    let runningBalance = 0;
    for (let e of events) {
        runningBalance += e.delta;
        history.push({
            time: e.time.toISOString(),
            balance: runningBalance,
        });
    }

    responseData = {
        message: 'Balance history generated',
        status: 200,
        data: history
    };
    return NextResponse.json(responseData);
}


        case 'topup-history': {
  const { id } = dataBody;

  const user = await User.findOne({ _id: id });
  if (!user) {
    return NextResponse.json({ error: 'User not found', status: 400 });
  }

  const transactions = await OnRampTransactions.find({ userId: id, status: "success" })
    .sort({ timeStamp: -1 });

  const formatted = transactions.map(tx => ({
    bank: tx.bank || "N/A",
    amount: Number(tx.amount) || 0,
    date: tx.timeStamp ? new Date(tx.timeStamp).toISOString() : new Date().toISOString(),
  }));

  return NextResponse.json({
    message: "Recent top-ups fetched",
    status: 200,
    data: formatted, // ✅ fix this line
  });
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


