import { XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useState, useEffect } from "react";
import Delete from "@/app/lib/actions/user/delete";

export default function DeleteAccountModal({ closeModal }) {
  return (
    <dialog className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center">
      <div className="bg-black m-auto p-8 rounded-lg relative">
        <div className="flex flex-col items-center max-w-96">
          <button onClick={closeModal} className="absolute top-2 right-2">
            <XMarkIcon className="w-6 h-6 text-red-500" />
          </button>
          <h3 className="font-bold text-4xl text-white">Delete Account</h3>
          <div className="flex flex-col w-full">
            <div>
              <p className="text-white m-6">
                Are you sure you want to delete your account? This action cannot
                be undone.
              </p>
            </div>
            <div className="mt-2">
              <DeleteBtn />
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}

function DeleteBtn() {
  const [isDeleting, setDeleting] = useState(false);
  const [deleteResult, setDeleteResult] = useState(null);

  const handleDeleteClick = async () => {
    try {
      setDeleting(true);
      const result = await Delete();
      setDeleteResult(result);
    } finally {
      setDeleting(false);
    }
  };

  useEffect(() => {
    if (deleteResult && deleteResult.success) {
      console.log(deleteResult.msg);
      window.location.href = "/";
    } else if (deleteResult && deleteResult.errorMsg) {
      console.error(deleteResult.errorMsg);
    }
  }, [deleteResult]);

  return (
    <button
      type="button"
      disabled={isDeleting}
      onClick={handleDeleteClick}
      className={clsx(
        "w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform rounded-md",
        {
          "bg-red-500 hover:bg-red-600": !isDeleting,
          "bg-gray-500 cursor-not-allowed hover:bg-gray-500": isDeleting,
        }
      )}
    >
      {!isDeleting ? "Delete" : "Processing..."}
    </button>
  );
}
