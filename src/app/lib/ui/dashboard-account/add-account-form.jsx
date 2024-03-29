import createNewManualAccount from "@/app/lib/actions/account/create-account";
import clsx from "clsx";
import { useFormState } from "react-dom";

export default function AddAccountForm({ userID, accountTypes }) {
  const [state, formAction] = useFormState(createNewManualAccount.bind(null, userID), {
    success: false,
    msg: "",
  });

  return (
    <form className="mt-6" action={formAction}>
      <div className="mb-4">
        <label
          htmlFor="accountName"
          className="block text-sm font-semibold text-gray-800 text-start"
        >
          Account Name
        </label>
        <input
          type="text"
          name="accountName"
          id="accountName"
          placeholder="Chase Checking"
          required
          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
        />
      </div>

      <div className="mb-2">
        <label
          htmlFor="accountBalance"
          className="block text-sm font-semibold text-gray-800 text-start"
        >
          Current Balance
        </label>
        <input
          type="text"
          name="accountBalance"
          id="accountBalance"
          placeholder="999.99"
          required
          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="accountType"
          className="block text-sm font-semibold text-gray-800 text-start"
        >
          Account Type
        </label>
        <select
          name="accountType"
          id="accountType"
          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
          required
        >
          {accountTypes.map((type) => (
            <option key={type.account_type_id} value={type.account_type_id}>
              {type.name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="p-2 bg-emerald-500 rounded-md hover:bg-emerald-400"
      >
        Create Account
      </button>

      {state.msg && <p className={clsx(
        'mt-4',
        {'text-green-500': state.success},
        {'text-red-500': !state.success}
      )}>
        {state.msg}
      </p>}
    </form>
  );
}
