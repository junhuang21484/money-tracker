"use client";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useFormState, useFormStatus } from "react-dom";
import clsx from "clsx";
import Update from "@/app/lib/actions/user/update";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EditProfileModal({ closeModal }) {
  const router = useRouter();
  const [state, formAction] = useFormState(Update, {
    success: false,
    msg: "",
    errorMsg: "",
  });

  useEffect(() => {
    console.log(state);
    if (state.success) router.push("/dashboard/profile");
  }, [state]);

  return (
    <dialog className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center">
      <div className="bg-black m-auto p-8 rounded-lg relative">
        <div className="flex flex-col items-center  max-w-96 ">
          <button onClick={closeModal} className="absolute top-2 right-2">
            <XMarkIcon className="w-6 h-6 text-red-500" />
          </button>
          <h3 className="font-bold text-4xl text-white">Edit Profile</h3>
          <div className="flex w-full ">
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
              {state.errorMsg && (
                <p
                  className={`text-center text-${
                    state.success ? "green" : "red"
                  }-500 mb-2`}
                >
                  {state.errorMsg}
                </p>
              )}
              <div className="mt-2">
                <UpdateBtn />
              </div>
            </form>
          </div>
        </div>
      </div>
    </dialog>
  );
}

function UpdateBtn() {
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
      {!pending ? "Update" : "Processing..."}
    </button>
  );
}
