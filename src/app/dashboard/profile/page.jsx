"use client";
import { useEffect, useState } from "react";
import EditProfileBtn from "@/app/lib/ui/dashboard/profile/edit-profile-btn";
import DeleteAccountBtn from "@/app/lib/ui/dashboard/profile/delete-account-btn";
import EditProfilePicBtn from "@/app/lib/ui/dashboard/profile/edit-profile-pic-btn";
import {
  fetchFirstNameByUserID,
  fetchLastNameByUserID,
  fetchEmailByUserID,
  fetchProfilePictureUrlByUserID,
} from "@/app/lib/data/user";
import { getLoggedInUserID } from "@/app/lib/data/jwtToken";

const ProfilePage = () => {
  const [userID, setUserID] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const fetchedUserID = await getLoggedInUserID();
      const fetchedFirstName = await fetchFirstNameByUserID(fetchedUserID);
      const fetchedLastName = await fetchLastNameByUserID(fetchedUserID);
      const fetchedEmail = await fetchEmailByUserID(fetchedUserID);

      setUserID(fetchedUserID);
      setFirstName(fetchedFirstName);
      setLastName(fetchedLastName);
      setEmail(fetchedEmail);
      displayImage(fetchedUserID);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const displayImage = (userID) => {
    fetchProfilePictureUrlByUserID(userID)
      .then((url) => {
        if (url) {
          setImageSrc(url);
        } else {
          console.error("Image URL is not provided for userID:", userID);
          setImageSrc("/user-control/signin-left-img.png");
        }
      })
      .catch((error) => {
        console.error("Error retrieving image URL from database:", error);
        setImageSrc("/user-control/signin-left-img.png");
      });
  };

  return (
    <section className="flex min-h-screen flex-col bg-[#121212]">
      <div className="px-8 py-8 max-w-lg">
        <div className="text-white mb-8">
          <h1 className="text-2xl font-semibold">Profile Settings</h1>
        </div>
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-gray-800 p-4 rounded-lg">
            <h1 className="text-xl text-white mb-4">PROFILE PICTURE</h1>
            <div className="flex justify-left items-center mb-4">
              {imageSrc && (
                <img
                  className="rounded-full overflow-hidden border-4 border-gray-700 w-40 h-40"
                  id="uploadedImage"
                  alt="Profile image"
                  src={imageSrc}
                />
              )}
            </div>
            <div className="flex justify-left">
              <EditProfilePicBtn onSuccess={fetchData} />
            </div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <h1 className="text-xl text-white mb-4">DETAILS</h1>
            <div>
              <p className="text-white mt-2">First Name: {firstName}</p>
              <p className="text-white mt-2">Last Name: {lastName}</p>
              <p className="text-white mt-2">Email: {email}</p>
            </div>
            <div className="mt-4 flex justify-left">
              <EditProfileBtn onSuccess={fetchData} />
            </div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <h1 className="text-xl text-white mb-4">MANAGE ACCOUNT</h1>
            <div className="flex justify-left">
              <DeleteAccountBtn />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
