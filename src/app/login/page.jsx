"use client";
import Login from "@/app/lib/actions/user/login";
import { useFormState, useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import clsx from "clsx";

export default function LoginPage() {
  const router = useRouter();
  const [state, formAction] = useFormState(Login, {
    success: false,
    msg: "",
    errorMsg: "",
  });

  useEffect(() => {
    console.log(state);
    if (state.success) {
      router.push("/");
    }
  }, [state, router]);

  return (
    <div
      className="flex flex-row items-stretch justify-center min-h-screen overflow-hidden"
      style={{ backgroundColor: "rgb(33,33,33)" }}
    >
      {/* Left Side: Image */}
      <div
        className="w-1/2 h-screen relative hidden lg:block"
        style={{ backgroundImage: `url('/user-control/signin-left-img.png')` }}
      ></div>

      {/* Right Side: Login Form */}
      <div className="w-4/5 flex flex-col items-center justify-center lg:w-1/2">
        <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-md">
          <div className="w-full justify-center flex">
            <Link
              href="/"
              className="text-3xl font-extrabold text-center text-emerald-500 mx-auto"
            >
              Money Minder
            </Link>
          </div>
          <form className="mt-6" action={formAction}>
            {state.errorMsg && !state.success && (
              <p className="text-red-500 text-center">{state.errorMsg}</p>
            )}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-800"
              >
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
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-800"
              >
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
            <Link
              href="/forget"
              className="text-xs text-blue-600 hover:underline"
            >
              Forget Password?
            </Link>
            <div className="mt-2">
              <SubmitBtn />
            </div>
          </form>
          <p className="mt-4 text-sm text-center text-gray-700">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-blue-600 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function SubmitBtn() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={clsx(
        "w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600",
        { "bg-gray-500 cursor-not-allowed hover:bg-gray-500": pending }
      )}
    >
      {!pending ? "Login" : "Processing..."}
    </button>
  );
}
