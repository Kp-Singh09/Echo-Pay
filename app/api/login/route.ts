import { NextRequest, NextResponse } from "next/server";
import User from "@/app/libs/models/userModel";
import Balance from "@/app/libs/models/BalanceModel";
import dbConnect from "@/app/libs/mongoDB";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
    const { method, dataBody, type, auth } = await req.json();
    let responseData = null;

    try {
        // Connect to the database
        await dbConnect();

        switch (type) {
            case 'login':{
                const { number, password } = dataBody;

                const user = await User.findOne({ number });

                if (!user) {
                // Create a new user
                const hashedPassword = await bcrypt.hash(password, 10);
                const newUser = new User({
                    number,
                    password: hashedPassword
                });
                await newUser.save();
                const newBalance = new Balance({
                    userId: newUser._id,
                    amount: 0
                });
                await newBalance.save();
                responseData = { message: 'User created successfully', status: 200, data: { user_id: newUser._id, number: newUser.number } };
                return NextResponse.json(responseData);
                }

                // Check if the password is correct
                const validPassword = await bcrypt.compare(password, user.password);
                if (!validPassword) {
                    responseData = { error: 'Invalid password', status: 400 };
                    return NextResponse.json(responseData);
                }
                responseData = { message: 'Login successful', status: 200, data: { user_id: user._id, number: user.number } };
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


