"use server";
require("dotenv").config();
import { updateUserByID } from "@/app/lib/data/user";
import { getLoggedInUserID } from "@/app/lib/data/jwtToken";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";

export default async function Update(userData, prevState, formData) {
  const loggedInUserId = await getLoggedInUserID()
  console.log(userData)
  if (!loggedInUserId || loggedInUserId != userData.user_id) return {
    msg: "Unauthorized",
    errorMsg: "Unauthorized",
    success: false,
  }
  
  try {
    const updatedUserData = {password: userData.password};

    if (formData.get("first_name") !== undefined && formData.get("first_name") !== "") {
      if (/^[a-zA-Z]+$/.test(formData.get("first_name"))) {
        updatedUserData.first_name = formData.get("first_name")
      } else {
        return {
          msg: "Invalid first name",
          errorMsg: "Invalid first name",
          success: false,
        };
      }
    }

    if (formData.get("last_name") !== undefined && formData.get("last_name") !== "") {
      if (/^[a-zA-Z]+$/.test(formData.get("last_name"))) {
        updatedUserData.last_name = formData.get("last_name");
      } else {
        return {
          msg: "Invalid last name",
          errorMsg: "Invalid last name",
          success: false,
        };
      }
    }

    if (formData.get('confirmPassword') !== null && formData.get('confirmPassword') !== "") {
      const newPassword = formData.get('password');
      if (newPassword === formData.get('confirmPassword')) {
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
      await updateUserByID(userData.user_id, updatedUserData);
    }

    revalidatePath('dashboard/profile')
    return {
      msg: "User information updated",
      errorMsg: "User information updated",
      success: true,
    };
  } catch (e) {
    console.error(e);
    return {
      msg: "Server error",
      errorMsg: "Server error",
      success: false,
    };
  }
}
