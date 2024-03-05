"use server";
require("dotenv").config();
import { fetchUserByEmail, updateUser } from "@/app/lib/data/user";
import bcrypt from "bcrypt";

export default async function Update(prevState, formData) {
  try {
    const existingUser = await fetchUserByEmail(
      formData.get("email").toLowerCase()
    );
    if (existingUser) {
      return { msg: "", errorMsg: "Email already in use", success: false };
    }

    if (formData.get("password") != formData.get("confirmPassword")) {
      return { msg: "", errorMsg: "Password does not match", success: false };
    }

    const hashedPassword = await bcrypt.hash(formData.get("password"), 10);
    await updateUser(
      formData.get("email"),
      hashedPassword,
      formData.get("firstName"),
      formData.get("lastName")
    );

    return { msg: "User updated", errorMsg: "", success: true };
  } catch (e) {
    console.error(e);
    return { msg: "", errorMsg: "Server error", success: false };
  }
}
