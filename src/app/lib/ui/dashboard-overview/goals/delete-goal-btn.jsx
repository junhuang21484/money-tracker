'use client'

import { useState, useEffect} from "react";
import deleteGoal from "@/app/lib/actions/goals/delete-goal";
import InfoModal from "@/app/lib/ui/general-modals/info-modal";
import LoadingModal from "@/app/lib/ui/general-modals/loading-modal";
import ActionModal from "@/app/lib/ui/general-modals/action-modal";
import { TrashIcon } from "@heroicons/react/24/outline";

export function DeleteGoalBtn({ goalData }) {
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
        const data = await deleteGoal(goalData);
        setInfoModalMsg({
          title: data.success
            ? "Goal Deleted"
            : "Failed To Delete Goal",
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
              "By clicking confirm you acknowledge that this goal will be removed indefinitely"
            }
            actionFunc={() => setDeleteConfirm(true)}
            closeModal={() => setActionModalOpen(false)}
          />
        )}
  
        {loadingModalOpen && (
          <LoadingModal description={"Deleting Goal"} />
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