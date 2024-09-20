import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest) {
  try {
    const cookies = request.cookies; // Access the cookies
    const token = cookies.get("token"); // Retrieve the value of token

    const response = NextResponse.json({
      message: "Logout successful",
      success: true,
    });

    // Clear the cookie
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    return response;
  } catch (err: any) {
    console.error("Error during logout:", err);
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
