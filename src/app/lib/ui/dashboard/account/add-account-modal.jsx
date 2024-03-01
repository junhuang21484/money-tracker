export default function AddAccountModal( {closeModal} ) {
    return (
        <dialog
            className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center">
            <div className="bg-white m-auto p-8 rounded-lg">
                <div className="flex flex-col items-center text-center max-w-96 ">
                    <h3 className="font-bold text-4xl">Add Account</h3>
                    <p className="text-wrap mt-2 text-xl">THIS WILL BECOME A FORM</p>
                    <br/>
                    <button onClick={closeModal} className="bg-red-500 text-white p-2 rounded">Close</button>
                </div>
            </div>
        </dialog>
    );
}

