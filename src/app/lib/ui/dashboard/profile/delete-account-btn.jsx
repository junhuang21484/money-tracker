"use client";

import { useState } from "react";
import DeleteAccountModal from "@/app/lib/ui/dashboard/profile/delete-account-model";
export default function DeleteAccountBtn({ userID }) {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div>
      {modalOpen && (
        <DeleteAccountModal
          userID={userID}
          closeModal={() => setModalOpen(false)}
        />
      )}
      <button
        onClick={() => setModalOpen(true)}
        className="bg-red-500 px-4 py-2 rounded hover:bg-red-300"
      >
        Delete Account
      </button>
    </div>
  );
}
