"use client";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import ActionModal from "@/app/lib/ui/general-modals/action-modal";
import deleteAccount from "@/app/lib/actions/account/delete-account";

export default function DelAccountBtn({accountData}) {
  const [modalOpen, setModalOpen] = useState(false)
  const [delAccount, setDelAccount] = useState(false)

  useEffect(() => {
    async function doDeleteAccount() {
        await deleteAccount(accountData)
    }
    
    if (delAccount) {
        console.log("DELETING ACCOUNT")
        doDeleteAccount()
        setDelAccount(false)
    }
  }, [delAccount])

  return (
    <div>
      {modalOpen && (
        <ActionModal
          title={"Delete Account"}
          description={
            "By clicking confirm you acknowledge that all your account information including your transaction data related to the account will be deleted"
          }
          actionFunc={() => setDelAccount(true)}
          closeModal={() => setModalOpen(false)}
        />
      )}
      <button
        onClick={() => setModalOpen(true)}
        className="flex gap-2 rounded px-4 py-2 bg-red-500 hover:bg-red-600 text-white"
      >
        <TrashIcon className="h-6 w-6" />
        Delete Account
      </button>
    </div>
  );
}
