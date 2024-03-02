"use server";
require("dotenv").config();
import { fetchUserByEmail, insertNewUser } from "@/app/lib/data/user";
import bcrypt from "bcrypt";

export default async function Register(prevState, formData) {
  try {
    const existingUser = await fetchUserByEmail(formData.get("email").toLowerCase());
    if (existingUser) {
      return { msg: "", errorMsg: "Email already in use", success: false };
    }

    if (formData.get("password") != formData.get("confirmPassword")) {
      return { msg: "", errorMsg: "Password does not match", success: false}
    }

    const hashedPassword = await bcrypt.hash(formData.get("password"), 10);
    await insertNewUser(formData.get("email"), hashedPassword, formData.get("firstName"), formData.get("lastName"))

    return {msg: "User registered", errorMsg: "", success: true};
  } catch (e) {
    console.error(e);
    return { msg: "", errorMsg: "Server error", success: false };
  }
}
