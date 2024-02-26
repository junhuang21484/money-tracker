'use client'
import Login from "@/app/lib/actions/user/login"
import { useFormState } from "react-dom"
import { useRouter } from "next/navigation"
import { useEffect } from "react"


export default function LoginPage() {
    const router = useRouter()

    const [state, formAction] = useFormState(Login, {success: false, msg: ""})
    
    useEffect(() => {
        console.log(state)
        if (state.success) router.push("/")
    }, [state])
    
    return (
        <div className="w-screen h-screen">
            <form className="flex flex-col" action={formAction}>
                <input type="text" name="email" id="email" placeholder="email"></input>
                <input type="password" name="password" id="password" placeholder="password"></input>
                {state.msg && <p>{state.msg}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    )
}