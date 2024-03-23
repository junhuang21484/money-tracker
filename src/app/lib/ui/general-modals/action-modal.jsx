export default function ActionModal({
  title,
  description,
  actionFunc,
  closeModal,
}) {
  return (
    <dialog className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center">
      <div className="bg-white m-auto p-8 rounded-lg relative">
        <div className="flex flex-col items-center text-center max-w-96 gap-4">
          <h1 className="text-2xl">{title}</h1>
          <p>{description}</p>
          <div className="flex gap-2">
            <button
              onClick={() => {actionFunc(); closeModal()}}
              className="rounded w-[96px] px-4 py-2 bg-green-500 hover:bg-green-400"
            >
              Confirm
            </button>
            <button
              onClick={closeModal}
              className="rounded w-[96px] px-4 py-2 bg-red-500 hover:bg-red-400"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}
