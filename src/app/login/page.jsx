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
      router.push("/dashboard");
    }
  }, [state, router]);

  return (
    <div
      className="flex flex-row items-stretch justify-center min-h-screen overflow-hidden bg-[#121212]"
    >
      {/* Left Side: Image */}
      <div
        className="w-1/2 h-screen relative hidden lg:block bg-center bg-cover"
        style={{ backgroundImage: `url('/user-control/login.png')` }}
      ></div>

      {/* Right Side: Login Form */}
      <div className="w-4/5 flex flex-col justify-center lg:w-1/2">
        <div className="w-full pl-4 md:pl-10 lg:max-w-lg">
          <div className="w-full pb-4">
            <Link
              href="/"
              className="text-4xl font-bold text-primary-500 mx-auto"
            >
              MoneyMinder
            </Link>
            <p className="text-xl pt-2 text-white">Log in</p>
          </div>
          <form className="mt-6" action={formAction}>
            {state.errorMsg && !state.success && (
              <p className="text-red-500 text-center">{state.errorMsg}</p>
            )}
            <div className="mb-6">
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
            <div className="mb-2">
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
            <Link
              href="/forget"
              className="text-xs text-primary-500 hover:underline"
            >
              Forget Password?
            </Link>
            <div className="mt-2">
              <SubmitBtn />
            </div>
          </form>
          <p className="mt-4 text-sm  text-[#ADB7BE]">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-primary-500 hover:underline"
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
        "bg-primary-500 hover:bg-primary-600 text-white font-medium py-2.5 px-5 rounded-lg w-full",
        { "bg-gray-500 cursor-not-allowed hover:bg-gray-500": pending }
      )}
    >
      {!pending ? "Login" : "Processing..."}
    </button>
  );
}
