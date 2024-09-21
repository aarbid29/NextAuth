import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import { sendEmaill } from "@/helpers/mailer1";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { email } = reqBody;

    const currentUser = await User.findOne({ email });

    await sendEmaill({ email, emailType: "RESET", userId: currentUser._id });

    return NextResponse.json({ message: "succesfull occurence" });
  } catch (err: any) {
    console.error("Reset  error:", err.message);
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
