"use server";
require("dotenv").config();
import fetchUserByEmail from "@/app/lib/data/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export default async function Register(formData) {
  try {
    const existingUser = fetchUserByEmail(formData.get("email"));

    if (existingUser) {
      return { msg: "", errorMsg: "Email already in use", success: false };
    }

    const hashedPassword = await bcrypt.hash(formData.get("password"), 10);
    // create user is not yet implemented
    const newUser = createUser({
      email: formData.get("email"),
      password: hashedPassword,
    });

    const tokenData = {
      user_id: newUser.user_id,
    };

    const token = jwt.sign(tokenData, process.env.JWT_SECRET);

    const resp = {
      msg: "User registered",
      errorMsg: "",
      success: true,
    };

    const oneDay = 24 * 60 * 60 * 1000;
    cookies().set("token", token, { expires: Date.now() + oneDay });

    return resp;
  } catch (e) {
    console.error(e);
    return { msg: "", errorMsg: "Server error", success: false };
  }
}
