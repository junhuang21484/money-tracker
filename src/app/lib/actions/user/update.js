"use server";
require("dotenv").config();
import { updateUserByID } from "@/app/lib/data/user";
import bcrypt from "bcrypt";

export default async function Update(userID, userData) {
  console.log("userID:", userID);
  try {
    const updatedUserData = {};

    if (userData.first_name !== undefined && userData.first_name !== "") {
      if (/^[a-zA-Z]+$/.test(userData.first_name)) {
        updatedUserData.first_name = userData.first_name;
      } else {
        return {
          msg: "Invalid first name",
          errorMsg: "Invalid first name",
          success: false,
        };
      }
    }

    if (userData.last_name !== undefined && userData.last_name !== "") {
      if (/^[a-zA-Z]+$/.test(userData.last_name)) {
        updatedUserData.last_name = userData.last_name;
      } else {
        return {
          msg: "Invalid last name",
          errorMsg: "Invalid last name",
          success: false,
        };
      }
    }

    if (userData.email !== undefined && userData.email !== "") {
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
        updatedUserData.email = userData.email;
      } else {
        return {
          msg: "Invalid email",
          errorMsg: "Invalid email",
          success: false,
        };
      }
    }

    if (userData.password !== undefined && userData.password !== "") {
      const newPassword = userData.password;
      if (newPassword === userData.confirmPassword) {
        if (newPassword.length >= 8) {
          const numberRegex = /\d/;
          const letterRegex = /[a-zA-Z]/;
          const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

          if (
            numberRegex.test(newPassword) &&
            letterRegex.test(newPassword) &&
            specialCharRegex.test(newPassword)
          ) {
            updatedUserData.password = await bcrypt.hash(newPassword, 10);
          } else {
            return {
              msg: "Password must contain at least one number, one letter, and one special character",
              errorMsg:
                "Password must contain at least one number, one letter, and one special character",
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
      } else {
        return {
          msg: "Passwords do not match",
          errorMsg: "Passwords do not match",
          success: false,
        };
      }
    }

    if (Object.keys(updatedUserData).length > 0) {
      await updateUserByID(userID, updatedUserData);
    }

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
