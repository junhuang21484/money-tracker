"use server";

import { cookies } from "next/headers";
import { deleteUserByID } from "@/app/lib/data/user";
import { getLoggedInUserID } from "@/app/lib/data/jwtToken";

export default async function Delete() {
  try {
    const userID = await getLoggedInUserID();
    await deleteUserByID(userID);

    const storedCookies = cookies();
    if (storedCookies.get("token")) {
      storedCookies.delete("token");
    }

    return {
      msg: "User deleted",
      errorMsg: "",
      success: true,
    };
  } catch (error) {
    console.error("Error:", error.message);
    return {
      msg: "Server error",
      errorMsg: "Server error",
      success: false,
    };
  }
}
