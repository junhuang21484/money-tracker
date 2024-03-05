"use client";

import { useState } from "react";
import EditProfileModal from "@/app/lib/ui/dashboard/profile/edit-profile-modal";

export default function EditProfileBtn({ userID, accountTypes }) {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div>
      {modalOpen && (
        <EditProfileModal
          userID={userID}
          accountTypes={accountTypes}
          closeModal={() => setModalOpen(false)}
        />
      )}
      <button
        onClick={() => setModalOpen(true)}
        className="bg-emerald-500 px-4 py-2 rounded hover:bg-emerald-300"
      >
        Edit Profile
      </button>
    </div>
  );
}
