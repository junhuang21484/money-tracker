import jwt from "jsonwebtoken";

export function getDataFromToken(tokenVal) {
    try {
        const decodedToken = jwt.verify(tokenVal, process.env.JWT_SECRET);
        return {user_id: decodedToken.user_id}
    } catch (error) {
        console.log(error.message)
    }
}