"use client";

import { useState } from "react";
import AddAccountModal from "@/app/lib/ui/dashboard/account/add-account-modal";

export default function AddAccountBtn( {accountTypes} ) {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div>
      {modalOpen && <AddAccountModal accountTypes={accountTypes} closeModal={() => setModalOpen(false)} />}
      <button
        onClick={() => setModalOpen(true)}
        className="bg-emerald-500 px-4 py-2 rounded hover:bg-emerald-300"
      >
        Add Account
      </button>
    </div>
  );
}
