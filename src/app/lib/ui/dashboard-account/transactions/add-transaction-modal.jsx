import { XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useFormState, useFormStatus } from "react-dom";
import createNewTransaction from "@/app/lib/actions/transactions/create-transaction";

const TRANSACTION_CATEGORY = [
  "INCOME",
  "TRANSFER_IN",
  "TRANSFER_OUT",
  "LOAN_PAYMENTS",
  "BANK_FEES",
  "ENTERTAINMENT",
  "FOOD_AND_DRINK",
  "GENERAL_MERCHANDISE",
  "HOME_IMPROVEMENT",
  "MEDICAL",
  "PERSONAL_CARE",
  "GENERAL_SERVICES",
  "GOVERNMENT_AND_NON_PROFIT",
  "TRANSPORTATION",
  "TRAVEL",
  "RENT_AND_UTILITIES",
];

function AddTransactionForm({ accountData }) {
  const [state, formAction] = useFormState(
    createNewTransaction.bind(null, accountData),
    {
      msg: "",
      success: false,
    }
  );

  return (
    <form className="mt-6" action={formAction}>
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-sm font-semibold text-gray-800 text-start"
        >
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Amazon"
          required
          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="amount"
          className="block text-sm font-semibold text-gray-800 text-start"
        >
          Amount
        </label>
        <input
          type="text"
          name="amount"
          id="amount"
          placeholder="12.99"
          required
          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="category"
          className="block text-sm font-semibold text-gray-800 text-start"
        >
          Category
        </label>
        <select
          name="category"
          id="category"
          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
          required
        >
          {TRANSACTION_CATEGORY.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label
          htmlFor="date"
          className="block text-sm font-semibold text-gray-800 text-start"
        >
          Date
        </label>
        <input
          type="date"
          name="date"
          id="date"
          placeholder="12.99"
          required
          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
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
      {!pending ? "Add Transaction" : "Processing..."}
    </button>
  );
}

export default function AddTransactionModal({ accountData, closeModal }) {
  return (
    <dialog className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center">
      <div className="bg-white m-auto p-8 rounded-lg relative">
        <div className="flex flex-col items-center text-center max-w-96 ">
          <h1 className="text-2xl">Add Transaction</h1>
          <button onClick={closeModal} className="absolute top-2 right-2">
            <XMarkIcon className="w-6 h-6 text-red-500" />
          </button>
          <AddTransactionForm accountData={accountData} />
        </div>
      </div>
    </dialog>
  );
}
