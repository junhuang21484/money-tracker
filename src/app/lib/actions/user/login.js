'use server'

import { cookies } from "next/headers"

export default async function Login(prevState, formData) {
    console.log(formData.get("email"))
    console.log("USER LOGGING IN")
    
    return {success: true, msg: "Invalid credesasdntials"}
}