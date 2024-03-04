import AddAccountForm from "./add-account-form";
import AddAccountPlaid from "./add-account-plaid"
import { XMarkIcon } from "@heroicons/react/24/outline";
import React from "react";


const PLAID_BTN_STYLING = "bg-indigo-500 p-2 rounded my-4 hover:bg-indigo-600"
export default function AddAccountModal({ userID, accountTypes, closeModal }) {
  return (
    <dialog className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center">
      <div className="bg-white m-auto p-8 rounded-lg relative">
        <div className="flex flex-col items-center text-center max-w-96 ">
          <button onClick={closeModal} className="absolute top-2 right-2">
            <XMarkIcon className="w-6 h-6 text-red-500" />
          </button>

          <h3 className="font-bold text-4xl">Add Account</h3>
          <AddAccountPlaid userID={userID} />
          <div className="flex items-center w-full justify-center">
            <div className="border-b border-gray-500 w-2/5"></div>
            <div className="mx-4 text-gray-500">OR</div>
            <div className="border-b border-gray-500 w-2/5"></div>
          </div>

          <AddAccountForm userID={userID} accountTypes={accountTypes} />
        </div>
      </div>
    </dialog>
  );
}

