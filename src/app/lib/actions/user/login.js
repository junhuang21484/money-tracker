'use server'
require('dotenv').config()
import fetchUserByEmail from "@/app/lib/data/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export default async function Login(prevState, formData) {
    try {
        const user = fetchUserByEmail(formData.get("email"))
        if (!user) {
            return ({ msg: "Invalid Credentials", errorMsg: "Invalid credentials:User", success: false })
        }

        //const pwdMatch = await (password, user.password)
        if (formData.get("password") != user.password) {
            console.log(formData.get("password"), user.password)
            return ({ msg: "Invalid Credentials", errorMsg: "Invalid credentials:PWD", success: false })
        }

        const tokenData = {
            user_id: user.user_id,
        }

        const token = jwt.sign(
            tokenData,
            process.env.JWT_SECRET,
        )

        const oneDay = 24 * 60 * 60 * 1000
        cookies().set('token', token, { expires: Date.now() + oneDay })
        return { msg: "User login successful", errorMsg: "", success: true };
    } catch (e) {
        console.error(e);
        return ({ msg: "", errorMsg: "Server error", success: false })
    };
}