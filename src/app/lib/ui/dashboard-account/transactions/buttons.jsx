"use client";

import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import AddTransactionModal from "./add-transaction-modal";

export function AddTransactionBtn({accountData}) {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div>
      {openModal && <AddTransactionModal accountData={accountData} closeModal={() => setOpenModal(false)}/>}
      <button onClick={() => setOpenModal(true)} className="bg-emerald-500 hover:bg-emerald-400 hover:text-blue-500 rounded px-4 py-2 w-fit flex gap-2 items-center justify-center">
        <PlusCircleIcon className="w-6 h-6" />
        Transaction
      </button>
    </div>
  );
}
