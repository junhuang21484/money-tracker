import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { storage } from "@/app/lib/data/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

import {
  fetchProfilePictureUrlByUserID,
  updateProfilePicture,
} from "@/app/lib/data/user";
import { getLoggedInUserID } from "@/app/lib/data/jwtToken";

export default function EditProfilePicModal({ closeModal }) {
  const [userID, setUserID] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedUserID = await getLoggedInUserID();
        setUserID(fetchedUserID);
        displayImage(fetchedUserID);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchData();
  }, []);

  const displayImage = (userID) => {
    fetchProfilePictureUrlByUserID(userID)
      .then((url) => {
        if (url) {
          setImageSrc(url);
        } else {
          console.error("Image URL is not provided.");
          setImageSrc("/user-control/signin-left-img.png");
        }
      })
      .catch((error) => {
        console.error("Error retrieving image URL from database:", error);
        setImageSrc("/user-control/signin-left-img.png");
      });
  };

  const uploadImage = () => {
    if (!imageUpload) {
      setError("Please select an image.");
      return;
    }

    if (!imageUpload.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload)
      .then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            saveImageUrlToDatabase(url);
          })
          .catch((error) => {
            console.error("Error getting download URL:", error);
            setError("Failed to upload image. Please try again.");
          });
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
        setError("Failed to upload image. Please try again.");
      });
  };

  const saveImageUrlToDatabase = (imageUrl) => {
    updateProfilePicture(userID, imageUrl)
      .then(() => {
        console.log("Image URL saved to the database.");
        displayImage(userID);
      })
      .catch((error) => {
        displayImage(userID);
        console.error("Error saving image URL to database:", error);
        //setError("Failed to save image URL to database.");
      });
  };

  return (
    <dialog className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center">
      <div className="bg-black m-auto p-8 rounded-lg relative shadow-lg">
        <div className="flex flex-col items-center max-w-96">
          <button onClick={closeModal} className="absolute top-2 right-2">
            <XMarkIcon className="w-6 h-6 text-red-500" />
          </button>
          <h3 className="font-bold text-4xl text-white mb-4">
            Edit Profile Picture
          </h3>
          <div className="flex flex-col items-center space-y-4">
            <div className="rounded-full overflow-hidden border-4 border-gray-700 w-80 h-80">
              {imageSrc && (
                <img
                  className="w-full h-full object-cover"
                  id="uploadedImage"
                  alt="Profile image"
                  src={imageSrc}
                />
              )}
            </div>
            <input
              type="file"
              className="w-full px-4 py-2 text-white "
              onChange={(event) => {
                setImageUpload(event.target.files[0]);
              }}
            />
            {error && <p className="text-red-500">{error}</p>}
            <button
              onClick={uploadImage}
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
