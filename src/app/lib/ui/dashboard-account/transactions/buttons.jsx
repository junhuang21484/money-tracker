"use client";

import {
  PlusCircleIcon,
  ArrowPathRoundedSquareIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import AddTransactionModal from "./add-transaction-modal";
import InfoModal from "@/app/lib/ui/general-modals/info-modal";
import LoadingModal from "@/app/lib/ui/general-modals/loading-modal"
import syncTransactions from "@/app/lib/actions/transactions/sync-transaction";

export function AddTransactionBtn({ accountData }) {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div>
      {openModal && (
        <AddTransactionModal
          accountData={accountData}
          closeModal={() => setOpenModal(false)}
        />
      )}
      <button
        onClick={() => setOpenModal(true)}
        className="bg-emerald-500 hover:bg-emerald-400 hover:text-blue-500 rounded px-4 py-2 w-fit flex gap-2 items-center justify-center"
      >
        <PlusCircleIcon className="w-6 h-6" />
        Transaction
      </button>
    </div>
  );
}

export function SyncTransactionBtn({ accountData }) {
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [loadingModalOpen, setLoadingModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState( { title: "", desc: "", iconType: null } );

  async function handleSync() {
    setLoadingModalOpen(true)
    const result = await syncTransactions(accountData);
    if (result.success) {
      setModalMsg({ title: "Transaction Synced Success", desc: result.msg, iconType: "check" })
    } else {
      setModalMsg({ title: "Transaction Synced Failed", desc: result.msg, iconType: "xmark" })
    }
    setLoadingModalOpen(false)
    setInfoModalOpen(true)
  }

  return (
    <div>
      {loadingModalOpen && <LoadingModal description={"Fetching data from plaid..."} />}
      {infoModalOpen && (
        <InfoModal
          title={modalMsg.title}
          description={modalMsg.desc}
          iconType={modalMsg.iconType}
          closeModal={() => setInfoModalOpen(false)}
        />
      )}
      <button
        className="bg-emerald-500 hover:bg-emerald-400 hover:text-blue-500 rounded px-4 py-2 w-fit flex gap-2 items-center justify-center"
        onClick={async () => {
          handleSync();
        }}
      >
        <ArrowPathRoundedSquareIcon className="w-6 h-6" />
        Sync
      </button>
    </div>
  );
}
