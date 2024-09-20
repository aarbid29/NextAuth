import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const TokenData = async (request: NextRequest) => {
  try {
    const cookies = request.cookies;
    const token = cookies.get("token")?.value || "";

    const decodedToken: any = await jwt.verify(token, process.env.TOKEN_SECRET);

    return decodedToken.id;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
