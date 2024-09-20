import { TokenData } from "@/helpers/TokenData";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();
//to know which user it is from the token
export async function GET(request: NextRequest) {
  try {
    const userId = await TokenData(request);

    const user = await User.findOne({ _id: userId }).select("-password");

    return NextResponse.json({ data: user });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
