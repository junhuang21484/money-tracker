"use server";
require("dotenv").config();
import { fetchUserByEmail, insertNewUser } from "@/app/lib/data/user";
import bcrypt from "bcrypt";

export default async function Register(prevState, formData) {
  try {
    const existingUser = await fetchUserByEmail(
      formData.get("email").toLowerCase()
    );
    if (existingUser) {
      return {
        msg: "Email already in use",
        errorMsg: "Email already in use",
        success: false,
      };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.get("email"))) {
      return {
        msg: "Invalid email format",
        errorMsg: "Invalid email format",
        success: false,
      };
    }

    if (formData.get("password") !== formData.get("confirmPassword")) {
      return {
        msg: "Password does not match",
        errorMsg: "Password does not match",
        success: false,
      };
    }

    const nameRegex = /^[a-zA-Z\s]*$/;
    if (
      !nameRegex.test(formData.get("firstName")) ||
      !nameRegex.test(formData.get("lastName"))
    ) {
      return {
        msg: "First and last names cannot contain numbers or special characters",
        errorMsg:
          "First and last names cannot contain numbers or special characters",
        success: false,
      };
    }

    if (formData.get("password").length < 8) {
      return {
        msg: "Password must be more than 8 characters",
        errorMsg: "Password must be more than 8 characters",
        success: false,
      };
    }

    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(formData.get("password"))) {
      return {
        msg: "",
        errorMsg:
          "Password must contain at least one number, one letter, and one special character",
        success: false,
      };
    }

    const hashedPassword = await bcrypt.hash(formData.get("password"), 10);

    await insertNewUser(
      formData.get("email"),
      hashedPassword,
      formData.get("firstName"),
      formData.get("lastName")
    );

    return { msg: "User registered", errorMsg: "", success: true };
  } catch (error) {
    console.error("Error during user registration:", error);
    return { msg: "Server error", errorMsg: "Server error", success: false };
  }
}
