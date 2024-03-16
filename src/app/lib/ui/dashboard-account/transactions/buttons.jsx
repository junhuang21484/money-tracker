"use client";

import {
  PlusCircleIcon,
  ArrowPathRoundedSquareIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import AddTransactionModal from "./add-transaction-modal";
import InfoModal from "@/app/lib/ui/general-modals/info-modal";
import LoadingModal from "@/app/lib/ui/general-modals/loading-modal";
import ActionModal from "@/app/lib/ui/general-modals/action-modal";
import syncTransactions from "@/app/lib/actions/transactions/sync-transaction";
import deleteTransaction from "@/app/lib/actions/transactions/delete-transaction";

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
  const [modalMsg, setModalMsg] = useState({
    title: "",
    desc: "",
    iconType: null,
  });

  async function handleSync() {
    setLoadingModalOpen(true);
    const result = await syncTransactions(accountData);
    if (result.success) {
      setModalMsg({
        title: "Transaction Synced Success",
        desc: result.msg,
        iconType: "check",
      });
    } else {
      setModalMsg({
        title: "Transaction Synced Failed",
        desc: result.msg,
        iconType: "xmark",
      });
    }
    setLoadingModalOpen(false);
    setInfoModalOpen(true);
  }

  return (
    <div>
      {loadingModalOpen && (
        <LoadingModal description={"Fetching data from plaid..."} />
      )}
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

export function DeleteTransactionBtn({ transactionId }) {
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [loadingModalOpen, setLoadingModalOpen] = useState(false);
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [infoModalMsg, setInfoModalMsg] = useState({
    title: "",
    description: "",
    iconType: "",
  });
  const [actionModalOpen, setActionModalOpen] = useState(false);

  useEffect(() => {
    async function doDelete() {
      setLoadingModalOpen(true);
      const data = await deleteTransaction(transactionId);
      setInfoModalMsg({
        title: data.success
          ? "Transaction Deleted"
          : "Failed To Delete Transaction",
        description: data.msg,
        iconType: data.success ? "check" : "xmark",
      });
      setLoadingModalOpen(false);
      setInfoModalOpen(true);
    }

    if (deleteConfirm) {
      doDelete();
      setDeleteConfirm(false);
    }
  }, [deleteConfirm]);

  return (
    <div>
      {actionModalOpen && (
        <ActionModal
          title={"Confirm Deletion"}
          description={
            "By clicking confirm you acknowledge that this transaction will be removed indefinitely"
          }
          actionFunc={() => setDeleteConfirm(true)}
          closeModal={() => setActionModalOpen(false)}
        />
      )}

      {loadingModalOpen && (
        <LoadingModal description={"Deleting Transaction"} />
      )}

      {infoModalOpen && (
        <InfoModal
          title={infoModalMsg.title}
          description={infoModalMsg.description}
          iconType={infoModalMsg.iconType}
          closeModal={() => setInfoModalOpen(false)}
        />
      )}

      <button
        className="bg-red-500 rounded p-1"
        onClick={() => setActionModalOpen(true)}
      >
        <TrashIcon className="w-5 h-5" />
      </button>
    </div>
  );
}

export function EditTransactionBtn({ transactionId }) {
  return (
    <button className="bg-gray-700 rounded p-1">
      <PencilSquareIcon className="w-5 h-5" />
    </button>
  );
}
