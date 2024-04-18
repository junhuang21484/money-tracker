export const dynamic = 'force-dynamic'
import EditProfileBtn from "@/app/lib/ui/dashboard/profile/edit-profile-btn";
import DeleteAccountBtn from "@/app/lib/ui/dashboard/profile/delete-account-btn";
import EditProfilePicBtn from "@/app/lib/ui/dashboard/profile/edit-profile-pic-btn";
import { fetchUserByID } from "@/app/lib/data/user";
import { getLoggedInUserID } from "@/app/lib/data/jwtToken";

export default async function ProfilePage() {
  const loggedInUser = await getLoggedInUserID();
  const userData = await fetchUserByID(loggedInUser)
  const imageSrc = userData.profile_picture ? userData.profile_picture : '/user-control/signin-left-img.png';

  return (
    <section className="flex flex-col items-center w-full h-full bg-gray-950 pt-8">
      <h1 className="text-4xl text-white font-bold mb-8">Profile Settings</h1>
      <div className="space-y-8">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl text-white mb-4">Profile Picture</h2>
          <div className="flex justify-center mb-4">
            <img
              className="rounded-full border-4 border-gray-700 w-40 h-40"
              alt="Profile"
              src={imageSrc}
            />
          </div>
          <div className="flex justify-center">
            <EditProfilePicBtn userData={JSON.parse(JSON.stringify(userData))} />
          </div>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96"> 
          <h2 className="text-2xl text-white mb-4">Account Details</h2>
          <p className="text-white">First Name: {userData.first_name}</p>
          <p className="text-white">Last Name: {userData.last_name}</p>
          <p className="text-white">Email: {userData.email}</p>
          <div className="flex justify-center mt-3">
            <EditProfileBtn userData={JSON.parse(JSON.stringify(userData))} />
          </div>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96"> 
          <h2 className="text-2xl text-white mb-4">Account Deletion</h2>
          <div className="flex justify-center">
            <DeleteAccountBtn />
          </div>
        </div>
      </div>
    </section>
  );
  
}