import { fetchFirstNameByUserID } from "@/app/lib/data/user";
import { fetchLastNameByUserID } from "@/app/lib/data/user";
import { fetchEmailByUserID } from "@/app/lib/data/user";
import { getDataFromToken } from "@/app/lib/data/jwtToken";
import { cookies } from "next/headers";
import EditProfileBtn from "@/app/lib/ui/dashboard/profile/edit-profile-btn";
import DeleteAccountBtn from "@/app/lib/ui/dashboard/profile/delete-account-btn";

const ProfilePage = async () => {
  const storedCookies = cookies();
  const token = storedCookies.get("token");
  const userID = getDataFromToken(token.value).user_id;
  const firstName = await fetchFirstNameByUserID(userID);
  const lastName = await fetchLastNameByUserID(userID);
  const email = await fetchEmailByUserID(userID);

  return (
    <div className="ml-4 mr-8">
      <div className=" text-white">
        <h1 className="text-2xl font-semibold">Profile</h1>
      </div>
      <div className="grid items-center">
        <div className="mt-6">
          <img
            className="max-w-full rounded-full w-80"
            src="/user-control/signin-left-img.png"
            alt="Profile image"
          />
        </div>
        <div className=" pr-4">
          <div className="mt-4 mb-4 p-4">
            <p className="text-white mt-2">First Name: {firstName}</p>
            <p className="text-white mt-2">Last Name: {lastName}</p>
            <p className="text-white mt-2">Email: {email}</p>
          </div>
          <div className="flex  mt-4">
            <EditProfileBtn userID={userID} />
            <DeleteAccountBtn />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
