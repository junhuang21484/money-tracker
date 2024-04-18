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
    <section className="flex w-full h-full flex-col bg-gray-950">
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
              <EditProfilePicBtn userData={JSON.parse(JSON.stringify(userData))}/>
            </div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <h1 className="text-xl text-white mb-4">DETAILS</h1>
            <div>
              <p className="text-white mt-2">First Name: {userData.first_name}</p>
              <p className="text-white mt-2">Last Name: {userData.last_name}</p>
              <p className="text-white mt-2">Email: {userData.email}</p>
            </div>
            <div className="mt-4 flex justify-left">
              <EditProfileBtn userData={JSON.parse(JSON.stringify(userData))}/>
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
}