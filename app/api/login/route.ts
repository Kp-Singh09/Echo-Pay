import { NextRequest, NextResponse } from "next/server";
import User from "@/app/libs/models/userModel";
import Balance from "@/app/libs/models/BalanceModel";
import dbConnect from "@/app/libs/mongoDB";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
     const { dataBody, type } = await req.json();
     if (!type || !dataBody) {
         return NextResponse.json({ error: 'Missing fields', status: 400 }, { status: 400 });
     }
     await dbConnect();

     if (type === 'login') {
         const { number, password } = dataBody;
         if (!number || !password) {
             return NextResponse.json({ error: 'Missing number or password', status: 400 }, { status: 400 });
         }
         const user = await User.findOne({ number });
         if (!user) {
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
             return NextResponse.json({ message: 'User created', status: 200,
                 data: { user_id: newUser._id, number: newUser.number } });
         }
         const validPassword = await bcrypt.compare(password, user.password);
         if (!validPassword) {
             return NextResponse.json({ error: 'Invalid password', status: 400 }, { status: 400 });
         }
         return NextResponse.json({ message: 'Login successful', status: 200,
             data: { user_id: user._id, number: user.number } });
     }

     return NextResponse.json({ error: 'Invalid request type', status: 400 }, { status: 400 });
  } catch (e: any) {
     console.error('POST /api/login error:', e);
     return NextResponse.json(
         { message: e.message ?? 'Internal Server Error' },
         { status: 500, statusText: 'Internal Server Error' }
     );
  }
}
