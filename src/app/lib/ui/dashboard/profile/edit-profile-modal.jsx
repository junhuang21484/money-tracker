import { XMarkIcon } from "@heroicons/react/24/outline";
import Update from "@/app/lib/actions/user/update";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  fetchFirstNameByUserID,
  fetchLastNameByUserID,
  fetchEmailByUserID,
} from "@/app/lib/data/user";
import { getLoggedInUserID } from "@/app/lib/data/jwtToken";

export default function EditProfileModal({ closeModal }) {
  const router = useRouter();
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [editingPassword, setEditingPassword] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const userID = await getLoggedInUserID();
      if (!userID) {
        throw new Error("User ID not found");
      }
      const firstName = await fetchFirstNameByUserID(userID);
      const lastName = await fetchLastNameByUserID(userID);
      const email = await fetchEmailByUserID(userID);

      setUserData({
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePasswordInputChange = (e) => {
    handleInputChange(e);
    setEditingPassword(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userID = await getLoggedInUserID();
    try {
      const response = await Update(userID, {
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        password: userData.password,
        confirmPassword: userData.confirmPassword,
      });

      if (response.success) {
        setStatusMessage("User information updated");
        await fetchUserData();
      } else {
        setStatusMessage(response.errorMsg);
      }
    } catch (error) {
      console.error("Error:", error);
      setStatusMessage("Server error occurred");
    }
  };

  return (
    <dialog className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center">
      <div className="bg-black m-auto p-8 rounded-lg relative">
        <div className="flex flex-col items-center  max-w-96 ">
          <button onClick={closeModal} className="absolute top-2 right-2">
            <XMarkIcon className="w-6 h-6 text-red-500" />
          </button>
          <h3 className="font-bold text-4xl text-white">
            Edit Account Details
          </h3>
          <div className="flex w-full ">
            <form onSubmit={handleSubmit} className="mt-6">
              <div className="flex w-full gap-4">
                <div className="mb-4">
                  <label
                    htmlFor="first_name"
                    className="text-white block mb-2 text-sm font-medium"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    id="firs_name"
                    required
                    value={userData.first_name}
                    onChange={handleInputChange}
                    className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="last_name"
                    className="text-white block mb-2 text-sm font-medium"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    id="last_name"
                    required
                    value={userData.last_name}
                    onChange={handleInputChange}
                    className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="text-white block mb-2 text-sm font-medium"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={userData.email}
                  onChange={handleInputChange}
                  className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="text-white block mb-2 text-sm font-medium"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  required
                  value={userData.password || ""}
                  onChange={handlePasswordInputChange}
                  className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                />
              </div>

              {editingPassword && (
                <div className="mb-4">
                  <label
                    htmlFor="confirmPassword"
                    className="text-white block mb-2 text-sm font-medium"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    value={userData.confirmPassword}
                    onChange={handleInputChange}
                    className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                  />
                </div>
              )}
              <div>
                {statusMessage && (
                  <p
                    className={`text-center text-${
                      statusMessage.includes("updated") ? "green" : "red"
                    }-500 mb-2`}
                  >
                    {statusMessage}
                  </p>
                )}
              </div>
              <div className="mt-2">
                <button
                  type="submit"
                  className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-primary-500 rounded-md hover:bg-primary-600"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </dialog>
  );
}
