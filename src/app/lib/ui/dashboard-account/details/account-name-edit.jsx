"use client";

import { useState } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { updateAccountName } from "@/app/lib/data/accounts"

export default function AccountNameEdit({ userID, accountID, accountName }) {
  const [accName, setAccName] = useState(accountName);
  const [editOpen, setEditOpen] = useState(false);

  function handleInputChange(event) {
    setAccName(event.target.value);
  }
  return (
    <div>
      <div className="flex items-center justify-center w-fit gap-2 h-full">
        {!editOpen ? (
          <h1 className="text-2xl">{accName}</h1>
        ) : (
          <input
            value={accName}
            onChange={handleInputChange}
            className="border-b-2 border-white text-black rounded text-2xl"
          ></input>
        )}

        {!editOpen ? (
          <button onClick={() => setEditOpen(true)}>
            <PencilSquareIcon className="w-6 h-6" />
          </button>
        ) : (
          <button
            onClick={async () => {
              setEditOpen(false)
              await updateAccountName(userID, accountID, accName)
            }}
            className="bg-emerald-500 hover:bg-emerald-400 rounded h-full px-4 py-1"
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
}
