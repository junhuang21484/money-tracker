import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

const iconMap = {
  check: {icon: CheckCircleIcon, styling: "text-green-500"},
  xmark: {icon: XCircleIcon, styling: "text-red-500"},
};

export default function InfoModal({
  title,
  description,
  closeModal,
  iconType = null,
}) {
  const Icon = iconMap[iconType]?.icon || null;
  const iconClassName = iconMap[iconType]?.styling || null
  return (
    <dialog className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center">
      <div className="bg-white m-auto p-8 rounded-lg relative">
        <div className="flex flex-col items-center text-center max-w-96 gap-4">
          {Icon && <Icon className={`w-8 h-8 ${iconClassName}`} />}
          <h1 className="text-2xl">{title}</h1>
          <p>{description}</p>
          <button
            onClick={closeModal}
            className="rounded px-4 py-2 bg-red-500 hover:bg-red-400"
          >
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
}
