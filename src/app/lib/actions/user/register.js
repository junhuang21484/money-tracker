"use server";
require("dotenv").config();
import fetchUserByEmail from "@/app/lib/data/user";
import bcrypt from "bcrypt";

export default async function Register(prevState, formData) {
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

    return {msg: "User registered", errorMsg: "", success: true};
  } catch (e) {
    console.error(e);
    return { msg: "", errorMsg: "Server error", success: false };
  }
}
