'use client'
import Login from "@/app/lib/actions/user/login"
import { useFormState } from "react-dom"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Link from "next/link";


export default function LoginPage() {
    const router = useRouter()
    const [state, formAction] = useFormState(Login, {success: false, msg: ""})
    
    useEffect(() => {
        console.log(state)
        if (state.success) router.push("/")
    }, [state])
    
    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-black" style={{ backgroundColor: 'rgb(33,33,33)' }}>
          <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
            <h1 className="text-3xl font-bold text-center text-gray-700">Logo</h1>
            <form className="mt-6" action={formAction}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-800">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              <div className="mb-2">
                <label htmlFor="password" className="block text-sm font-semibold text-gray-800">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              {state.msg && <p>{state.msg}</p>}
              <Link href="/forget" className="text-xs text-blue-600 hover:underline">
                Forget Password?
              </Link>
              <div className="mt-2">
                <button type="submit" className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                  Login
                </button>
              </div>
            </form>
            <p className="mt-4 text-sm text-center text-gray-700">
              Don't have an account?{" "}
              <Link href="/signup" className="font-medium text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      );
    }