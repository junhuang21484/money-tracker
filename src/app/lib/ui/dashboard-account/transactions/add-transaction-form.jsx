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

export default function AddTransactionForm({accountData}) {
  const [state, formAction] = useFormState(createNewTransaction.bind(null, accountData), {
    msg: "",
    success: false,
  });

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
      <button
        type="submit"
        className="p-2 bg-emerald-500 rounded-md hover:bg-emerald-400"
      >
        Add Transaction
      </button>
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
