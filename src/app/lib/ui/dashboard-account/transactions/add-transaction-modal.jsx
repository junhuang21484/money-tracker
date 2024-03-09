import AddTransactionForm from "./add-transaction-form";
import { XMarkIcon } from "@heroicons/react/24/outline";

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
