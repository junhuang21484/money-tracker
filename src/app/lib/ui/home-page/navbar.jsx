import Link from "next/link";
import { cookies } from "next/headers";

export default function Navbar() {
    const cookieStore = cookies()
    const isLoggedIn = cookieStore.get("token")
    return (
        <nav className="flex justify-around h-16 items-center">
            <Link href='/' className="text-emerald-500 font-extrabold text-2xl lg:text-4xl w-1/2">
                Money Minder
            </Link>
            
            <div className="flex gap-2">
                <Link href={isLoggedIn ? "/dashboard": "/login"} className="text-emerald-500 bg-slate-800 py-2 px-4 rounded hover:bg-slate-600">
                    {isLoggedIn ? "Dashboard" : "Login"}
                </Link>
            </div>
        </nav>
    )
}