"use server";
require("dotenv").config();
import {
  updateUserByID,
  fetchUserByID,
  fetchUserByEmail,
} from "@/app/lib/data/user";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { getDataFromToken } from "@/app/lib/data/jwtToken";

export default async function Update(prevState, formData) {
  const storedCookies = cookies();
  const token = storedCookies.get("token");
  const userID = getDataFromToken(token.value).user_id;

  try {
    const user = await fetchUserByID(userID);
    console.log("userID:", userID);

    const updatedUserData = {};

    const firstName = formData.get("firstName");
    if (
      firstName !== null &&
      firstName !== "" &&
      /^[a-zA-Z]+$/.test(firstName)
    ) {
      updatedUserData.firstName = firstName;
    } else {
      return {
        msg: "Invalid first name",
        errorMsg: "Invalid first name",
        success: false,
      };
    }

    const lastName = formData.get("lastName");
    if (lastName !== null && lastName !== "" && /^[a-zA-Z]+$/.test(lastName)) {
      updatedUserData.lastName = lastName;
    } else {
      return {
        msg: "Invalid last name",
        errorMsg: "Invalid last name",
        success: false,
      };
    }

    const existingUser = await fetchUserByEmail(
      formData.get("email").toLowerCase()
    );

    const email = formData.get("email");
    if (
      email !== null &&
      email !== "" &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
      !existingUser
    ) {
      updatedUserData.email = email;
    } else {
      return {
        msg: "Invalid or already in use email",
        errorMsg: "Invalid or already in use email",
        success: false,
      };
    }

    const newPassword = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    if (newPassword !== null && confirmPassword !== null) {
      if (newPassword.length >= 8) {
        if (newPassword === confirmPassword) {
          updatedUserData.password = await bcrypt.hash(newPassword, 10);
        } else {
          return {
            msg: "Passwords do not match",
            errorMsg: "Passwords do not match",
            success: false,
          };
        }
      } else {
        return {
          msg: "Password must be at least 8 characters long",
          errorMsg: "Password must be at least 8 characters long",
          success: false,
        };
      }
    }

    await updateUserByID(userID, updatedUserData);

    return {
      msg: "User information updated",
      errorMsg: "User information updated",
      success: true,
    };
  } catch (e) {
    console.error(e.message);
    return {
      msg: "Server error",
      errorMsg: "Server error",
      success: false,
    };
  }
}
