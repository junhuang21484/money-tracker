"use client";
import Register from "@/app/lib/actions/user/Register";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [state, formAction] = useFormState(Register, {
    success: false,
    msg: "",
  });

  useEffect(() => {
    console.log(state);
    if (state.success) router.push("/login");
  }, [state]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gradient-to-b from-green-900 to-black-400">
      <div className="w-full p-6 rounded-lg shadow-md lg:max-w-xl bg-opacity-20 bg-black bg-blur-md border-1 border-opacity-10 md:p-8">
        <h1 className="text-2xl  text-white">MoneyMinder</h1>
        <h1 className="text-3xl font-bold  text-white">Register</h1>
        <form className="mt-6" action={formAction}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-white"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-semibold text-white"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-white"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-white"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="confirm_password"
              id="confirm_password"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          {state.msg && <p>{state.msg}</p>}

          <div className="mt-4">
            <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-black transition-colors duration-200 transform bg-green-500 rounded-md hover:bg-green-00 focus:outline-none focus:bg-gray-600"
            >
              Register
            </button>
          </div>
        </form>
        <p className="mt-4 text-sm text-center text-white">
          Have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-green-500 hover:underline"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
