import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

// const { bcryptjs } = require("bcryptjs");

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    //checking if user alr exists
    // const existingUser = await User.findOne({ email });
    // if (existingUser) {
    //   return NextResponse.json(
    //     {
    //       error: "User already exists",
    //     },
    //     { status: 400 }
    //   );
    // }

    // Hashing  password
    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = new User({ email, username, password: hashedPassword });
    await newUser.save();

    return NextResponse.json({
      message: "User created successfully",
      success: true,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
