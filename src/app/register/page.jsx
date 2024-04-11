"use client";
import Register from "@/app/lib/actions/user/register";
import { useFormState, useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import clsx from "clsx";

export default function RegisterPage() {
  const router = useRouter();
  const [state, formAction] = useFormState(Register, {
    success: false,
    msg: "",
    errorMsg: "",
  });

  useEffect(() => {
    console.log(state);
    if (state.success) router.push("/login");
  }, [state]);

  return (
    <div
      className="flex flex-row items-stretch justify-center min-h-screen overflow-hidden bg-[#121212]"
    >
      {/* Left Side: Image */}
      <div
        className="w-1/2 h-screen relative hidden lg:block bg-center bg-cover"
        style={{ backgroundImage: `url('/user-control/register.png')` }}
      ></div>
      <div className="w-4/5 flex flex-col justify-center lg:w-1/2">
        <div className="w-full pl-4 md:pl-10 lg:max-w-lg">
          <div className="w-full pb-4">
            <Link
              href="/"
              className="text-4xl font-bold text-primary-500 mx-auto"
            >
              MoneyMinder
            </Link>
            <p className="text-xl pt-2 text-white">Register</p>
          </div>
          <form className="mt-6" action={formAction}>
            <div className="flex w-full gap-4">
              <div className="mb-6 flex-grow">
                <label
                  htmlFor="firstName"
                  className="text-white block mb-2 text-sm font-medium"
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  required
                  className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                />
              </div>

              <div className="mb-4 flex-grow">
                <label
                  htmlFor="lastName"
                  className="text-white block mb-2 text-sm font-medium"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  required
                  className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                />
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="text-white block mb-2 text-sm font-medium"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="text-white block mb-2 text-sm font-medium"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                required
                className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="text-white block mb-2 text-sm font-medium"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                required
                className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
              />
            </div>
            {state.errorMsg && (
              <p className="text-center text-red-500 mb-2">{state.errorMsg}</p>
            )}

            <div className="mt-2">
              <SubmitBtn />
            </div>
          </form>
          <p className="mt-4 text-sm  text-[#ADB7BE]">
            Have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-primary-500 hover:underline"
            >
              Log In
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
        "bg-primary-500 hover:bg-primary-600 text-white font-medium py-2.5 px-5 rounded-lg w-full",
        { "bg-gray-500 cursor-not-allowed hover:bg-gray-500": pending }
      )}
    >
      {!pending ? "Register" : "Processing..."}
    </button>
  );
}
