'use client'
import Logout from "@/app/lib/actions/user/logout"

export default function LogoutBtn() {
    return (
        <div className="hidden md:flex text-emerald-500 cursor-pointer ml-4 px-3 py-2 bg-gray-800 rounded hover:bg-gray-700" onClick={async () => { Logout() }}>
            Logout
        </div>
    )
}