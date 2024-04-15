"use server";
require("dotenv").config();
import { deleteUserByID, fetchUserByID } from "@/app/lib/data/user";
import { cookies } from "next/headers";
import { getDataFromToken } from "@/app/lib/data/jwtToken";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function Delete() {
  const storedCookies = cookies();
  const token = storedCookies.get("token");
  const userID = getDataFromToken(token.value).user_id;

  try {
    const user = await fetchUserByID(userID);
    console.log("userID:", userID);

    await deleteUserByID(userID);

    if (storedCookies.get("token")) {
      storedCookies.delete("token");
      redirect("/");
    }

    return {
      msg: "User deleted",
      errorMsg: "",
      success: true,
    };
  } catch (e) {
    console.error(e.message);
    return {
      msg: "Server error",
      errorMsg: "Server error",
      success: false,
    };
  } finally {
    redirect("/");
  }
}
