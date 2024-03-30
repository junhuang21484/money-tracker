"use client";

import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import clsx from "clsx";
import { createGoal } from "@/app/lib/actions/goals/create-goal";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Select from "react-select";

function SubmitBtn() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={clsx(
        "w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-emerald-500 rounded-md hover:bg-emerald-600",
        { "bg-gray-500 cursor-not-allowed hover:bg-gray-500": pending }
      )}
    >
      {!pending ? "Add Goal" : "Processing..."}
    </button>
  );
}

function AddGoalForm({ userId, accountData }) {
  const [state, formAction] = useFormState(createGoal.bind(null, userId), {
    msg: "",
    success: false,
  });

  const accountOptions = accountData.map((account) => ({
    value: account.account_id,
    label: `${account.name} - ${account.balance}`,
  }));

  return (
    <form className="mt-6" action={formAction}>
      <div className="mb-4">
        <label
          htmlFor="goalName"
          className="block text-sm font-semibold text-gray-800 text-start"
        >
          Goal Name
        </label>
        <input
          type="text"
          name="goalName"
          id="goalName"
          placeholder="First Car"
          required
          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="goalAmount"
          className="block text-sm font-semibold text-gray-800 text-start"
        >
          Goal Amount
        </label>
        <input
          type="text"
          name="goalAmount"
          id="goalAmount"
          placeholder="50000"
          required
          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="accounts"
          className="block text-sm font-semibold text-gray-800 text-start"
        >
          Related Accounts
        </label>
        <Select
          name="accounts"
          id="accounts"
          options={accountOptions}
          isMulti
          className="basic-multi-select text-start"
          classNamePrefix="select"
        />
      </div>

      <SubmitBtn />
      {state.msg && (
        <p
          className={clsx(
            "mt-4",
            { "text-green-500": state.success },
            { "text-red-500": !state.success }
          )}
        >
          {state.msg}
        </p>
      )}
    </form>
  );
}

function AddGoalModal({ userId, accountData, closeModal }) {
  return (
    <dialog className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center">
      <div className="bg-white m-auto p-8 rounded-lg relative">
        <div className="flex flex-col items-center text-center max-w-96 ">
          <h1 className="text-2xl">Add Goal</h1>
          <button onClick={closeModal} className="absolute top-2 right-2">
            <XMarkIcon className="w-6 h-6 text-red-500" />
          </button>
          <AddGoalForm userId={userId} accountData={accountData} />
        </div>
      </div>
    </dialog>
  );
}

export default function CreateGoalBtn({ userId, accountData }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      {showModal && (
        <AddGoalModal
          userId={userId}
          accountData={accountData}
          closeModal={() => setShowModal(false)}
        />
      )}
      <button
        className="bg-emerald-500 hover:bg-emerald-700 py-2 px-4 rounded"
        onClick={() => setShowModal(true)}
      >
        Create Goal
      </button>
    </div>
  );
}
