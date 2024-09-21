//created for resetpassword
import { NextRequest } from "next/server";

import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";

export const sendEmaill = async ({ email, emailType, userId }: any) => {
  try {
    // hashed token

    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    console.log(hashedToken);

    // verifyToken and verifyTokenExpiry values will change; others will remain the same
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 36000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgetPasswordToken: hashedToken,
        forgetPasswordTokenExpiry: Date.now() + 36000,
      });
    }
    var transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    });

    const mailOptions = {
      from: "aarbid.b@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "VERIFY YOUR EMAIL" : "RESET YOUR PASSWORD",
      html: `
          <p>Click <a href="${
            process.env.domain
          }/resetpassword2?token=${hashedToken}">
          here</a> to ${
            emailType === "VERIFY" ? "verify your email" : "reset your password"
          }.</p>
        `,
    };
    const mailresponse = await transporter.sendMail(mailOptions);
    return mailresponse;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
