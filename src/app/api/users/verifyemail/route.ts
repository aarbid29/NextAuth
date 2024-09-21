import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;

    // Find the user by token and check expiry
    const currentUser = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gte: Date.now() },
    });

    if (!currentUser) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    // Update user status
    currentUser.isVerified = true;
    currentUser.verifyToken = undefined;
    currentUser.verifyTokenExpiry = undefined;

    // Save the updated user
    await currentUser.save();

    return NextResponse.json({ message: "Email verified" }, { status: 200 });
  } catch (err: any) {
    console.error("Verification error:", err.message);
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
