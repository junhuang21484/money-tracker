import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import uploadProfileImage from "@/app/lib/actions/user/update-pfp";

export default function EditProfilePicModal({ userData, closeModal }) {
  const [imageUpload, setImageUpload] = useState(null);
  const [err, setErr] = useState(null);

  const imageSrc = userData.profile_picture ? userData.profile_picture : "/user-control/signin-left-img.png";

  const convertFileToJSON = async (file) => {
    return {
      name: file.name,
      type: file.type,
      size: file.size,
      lastModified: file.lastModified,
      content: await convertToBase64(file),
    };
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <dialog className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center">
      <div className="bg-black m-auto p-8 rounded-lg relative shadow-lg">
        <div className="flex flex-col items-center max-w-96">
          <button onClick={closeModal} className="absolute top-2 right-2">
            <XMarkIcon className="w-6 h-6 text-red-500" />
          </button>
          <h3 className="font-bold text-4xl text-white mb-4">Edit Profile Picture</h3>
          <div className="flex flex-col items-center space-y-4">
            <div className="rounded-full overflow-hidden border-4 border-gray-700 w-80 h-80">
              {imageSrc && (
                <img className="w-full h-full object-cover" id="uploadedImage" alt="Profile image" src={imageSrc} />
              )}
            </div>
            <input
              type="file"
              className="w-full px-4 py-2 text-white "
              onChange={(event) => {
                setImageUpload(event.target.files[0])
              }}
            />
            {err && <p className="text-red-500">{err}</p>}
            <button
              onClick={async () => {
                const imageJSON = await convertFileToJSON(imageUpload);
                const data = await uploadProfileImage(userData.user_id, imageJSON);
                if (!data.success) setErr(data.msg);
              }}
              className="w-full px-4 py-2 text-white bg-primary-500 rounded-md hover:bg-primary-600"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}