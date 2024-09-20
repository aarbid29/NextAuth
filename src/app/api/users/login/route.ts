import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel"; // Ensure the model name is capitalized
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { email, password } = reqBody;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return NextResponse.json(
        {
          error: "User doesn't exist",
        },
        { status: 400 }
      );
    }

    // Check if password is correct
    const validPassword = await bcryptjs.compare(
      password,
      existingUser.password
    );
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

    // Create token
    const tokenData = {
      id: existingUser._id,
      username: existingUser.username,
      email: existingUser.email,
    };

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1hr",
    });

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
      token, // to return the token in the response
    });

    response.cookies.set("token", token, {
      httpOnly: true, // to make sure the cookie is not accessible via JavaScript
      maxAge: 3600, // Set the cookie to expire in 1 hour i.e 3600sec
    });
    return response;
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
