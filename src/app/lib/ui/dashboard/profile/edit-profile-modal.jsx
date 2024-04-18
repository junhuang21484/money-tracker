import { XMarkIcon } from "@heroicons/react/24/outline";
import Update from "@/app/lib/actions/user/update";
import { useState } from "react";
import { useFormState } from "react-dom";
import clsx from "clsx";

export default function EditProfileModal({ userData, closeModal }) {
  const [editingPassword, setEditingPassword] = useState(false);
  const [state, formAction] = useFormState(Update.bind(null, userData), {
    msg: "",
    errMsg: "",
    success: false,
  });
  return (
    <dialog className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center">
      <div className="bg-black m-auto p-8 rounded-lg relative">
        <div className="flex flex-col items-center  max-w-96 ">
          <button onClick={closeModal} className="absolute top-2 right-2">
            <XMarkIcon className="w-6 h-6 text-red-500" />
          </button>
          <h3 className="font-bold text-4xl text-white">
            Edit Account Details
          </h3>
          <div className="flex w-full ">
            <form action={formAction} className="mt-6">
              <div className="flex w-full gap-4">
                <div className="mb-4">
                  <label
                    htmlFor="first_name"
                    className="text-white block mb-2 text-sm font-medium"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    id="firs_name"
                    required
                    defaultValue={userData.first_name}
                    className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="last_name"
                    className="text-white block mb-2 text-sm font-medium"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    id="last_name"
                    required
                    defaultValue={userData.last_name}
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
                  value={userData.email}
                  disabled
                  className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5 cursor-not-allowed"
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
                  onChange={() => setEditingPassword(true)}
                  className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                />
              </div>

              {editingPassword && (
                <div className="mb-4">
                  <label
                    htmlFor="confirmPassword"
                    className="text-white block mb-2 text-sm font-medium"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                  />
                </div>
              )}
              <div>
                {state.msg && (
                  <p className={clsx({ "text-red-500": !state.success, "text-emerald-500": state.success })}>{state.msg}</p>
                )}
              </div>
              <div className="mt-2">
                <button
                  type="submit"
                  className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-primary-500 rounded-md hover:bg-primary-600"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </dialog>
  );
}
