import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export function getDataFromToken(tokenVal) {
    try {
        const decodedToken = jwt.verify(tokenVal, process.env.JWT_SECRET);
        return { user_id: decodedToken.user_id }
    } catch (error) {
        console.log(error.message)
    }
}

export function getLoggedInUserID() {
    try {
        const cookieStored = cookies()
        const tokenVal = cookieStored.get("token").value
        const decodedToken = jwt.verify(tokenVal, process.env.JWT_SECRET);
        return decodedToken.user_id
    } catch (error) {
        console.log(error.message)
    }
}