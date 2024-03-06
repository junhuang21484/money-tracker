"use client";
import Register from "@/app/lib/actions/user/register";
import { useFormState, useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import clsx from 'clsx'

export default function RegisterPage() {
  const router = useRouter();
  const [state, formAction] = useFormState(Register, {
    success: false,
    msg: "",
    errorMsg: "",
  });

  useEffect(() => {
    if (state.success) router.push("/login");
  }, [state]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gradient-to-b from-gray-950 to-gray-500">
      <div className="w-full p-6 rounded-lg shadow-md lg:max-w-xl bg-opacity-20 bg-black bg-blur-md border-1 border-opacity-10 md:p-8">
        <div className="w-full justify-center flex">
          <Link
            href="/"
            className="text-3xl font-extrabold text-center text-emerald-500 mx-auto"
          >
            Money Minder
          </Link>
        </div>
        <form className="mt-6" action={formAction}>
          <div className="flex w-full gap-4">
            <div className="mb-4">
              <label
                htmlFor="firstName"
                className="block text-sm font-semibold text-white"
              >
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                required
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="lastName"
                className="block text-sm font-semibold text-white"
              >
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                required
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
          </div>

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
              required
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
              required
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
              name="confirmPassword"
              id="confirmPassword"
              required
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          {state.errorMsg && <p className="text-center text-red-500 mb-2">{state.errorMsg}</p>}

          <div className="mt-2">
            <SubmitBtn />
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

function SubmitBtn() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={clsx(
        "w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-500 rounded-md hover:bg-green-400",
        { "bg-gray-500 cursor-not-allowed hover:bg-gray-500": pending }
      )}
    >
      {!pending ? "Register" : "Processing..."}
    </button>
  );
}
