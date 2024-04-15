"use client";

import { useState } from "react";
import EditProfilePicModal from "@/app/lib/ui/dashboard/profile/edit-profile-pic-model";

export default function EditProfilePicBtn({ onSuccess }) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalClose = () => {
    setModalOpen(false);
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <div>
      {modalOpen && <EditProfilePicModal closeModal={handleModalClose} />}
      <button
        onClick={() => setModalOpen(true)}
        className="bg-primary-500 px-4 py-2 rounded hover:bg-primary-600"
      >
        Edit Profile Picture
      </button>
    </div>
  );
}
