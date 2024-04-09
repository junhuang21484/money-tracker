"use client";

import { useState } from "react";
import EditProfileModal from "@/app/lib/ui/dashboard/profile/edit-profile-modal";

export default function EditProfileBtn({ userID }) {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div>
      {modalOpen && (
        <EditProfileModal
          userID={userID}
          closeModal={() => setModalOpen(false)}
        />
      )}
      <button
        onClick={() => setModalOpen(true)}
        className="bg-primary-500 px-4 py-2 rounded hover:bg-primary-600"
      >
        Edit Profile
      </button>
    </div>
  );
}
