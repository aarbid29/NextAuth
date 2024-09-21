import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token, password, confirmpassword } = reqBody;

    if (password !== confirmpassword) {
      return NextResponse.json(
        { error: "Passwords do not match" },
        { status: 400 }
      );
    }

    const currentUser = await User.findOne({
      forgetPasswordToken: token,
      forgetPasswordTokenExpiry: { $gte: Date.now() },
    });

    if (!currentUser) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcryptjs.hash(password.toString(), 10);

    // Updating  the users  password and  clear tokens fields
    currentUser.password = hashedPassword;
    currentUser.forgetPasswordToken = undefined;
    currentUser.forgetPasswordTokenExpiry = undefined;

    await currentUser.save();

    return NextResponse.json(
      { message: "Password reset successful" },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Reset error:", err.message);
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
