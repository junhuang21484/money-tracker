'use client'
import Login from "@/app/lib/actions/user/login"
import { useFormState } from "react-dom"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Link from "next/link";
import Image from "next/image";


export default function LoginPage() {
    const router = useRouter()
    const [state, formAction] = useFormState(Login, {success: false, msg: ""})

    useEffect(() => {
        console.log(state)
        if (state.success) {
            router.push("/")
        }
    }, [state, router])

    return (
        <div className="flex flex-row items-stretch justify-center min-h-screen overflow-hidden" style={{ backgroundColor: 'rgb(33,33,33)' }}>
          {/* Left Side: Image */}
          <div className="w-1/2 h-screen relative">
          <Image 
            src="/homepage/SigninLeftImg.png"
            alt="left-image"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
          </div>
      
          {/* Right Side: Login Form */}
          <div className="w-1/2 flex flex-col items-center justify-center">
            <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-md">
              <h1 className="text-3xl font-extrabold text-center text-emerald-500">Money Minder</h1>
              <form className="mt-6" action={formAction}>
              {state.msg && !state.success && <p className="text-red-500 text-center">{state.msg}</p>}
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-800">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
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
                    required
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
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
        </div>
      );
    }