"use server";
require("dotenv").config();
import { fetchUserByEmail } from "@/app/lib/data/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export default async function Login(prevState, formData) {
  try {
    const user = await fetchUserByEmail(formData.get("email"));
    if (!user) {
      return {
        msg: "Invalid Credentials",
        errorMsg: "Invalid Credentials",
        success: false,
      };
    }

    const pwdMatch = await bcrypt.compare(
      formData.get("password"),
      user.password
    );
    if (!pwdMatch) {
      return {
        msg: "Invalid Credentials",
        errorMsg: "Invalid Credentials",
        success: false,
      };
    }

    const tokenData = {
      user_id: user.user_id,
    };

    const token = jwt.sign(tokenData, process.env.JWT_SECRET);

    const oneDay = 24 * 60 * 60 * 1000;
    cookies().set("token", token, { expires: Date.now() + oneDay });
    return { msg: "User login successful", errorMsg: "", success: true };
  } catch (e) {
    console.log(e.message);
    return {
      msg: "Server error",
      errorMsg: "Server error",
      success: false,
    };
  }
}
