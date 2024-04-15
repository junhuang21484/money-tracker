"use client";

import { useState } from "react";
import EditProfileModal from "@/app/lib/ui/dashboard/profile/edit-profile-modal";

export default function EditProfileBtn({ onSuccess }) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalClose = () => {
    setModalOpen(false);
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <div>
      {modalOpen && <EditProfileModal closeModal={handleModalClose} />}
      <button
        onClick={() => setModalOpen(true)}
        className="bg-primary-500 px-4 py-2 rounded hover:bg-primary-600"
      >
        Edit Account Details
      </button>
    </div>
  );
}
