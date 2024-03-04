import Link from 'next/link';
import { cookies } from 'next/headers'; 
import { fetchFirstNameByUserID } from "@/app/lib/data/user";
import { getDataFromToken } from "@/app/lib/data/jwtToken";

export default async function Navbar() {
    const cookieStored = cookies();
    const token = cookieStored.get("token");
    const userId = getDataFromToken(token.value).user_id;
    const userName = await fetchFirstNameByUserID(userId);

    return (
        <nav className="flex justify-around h-16 items-center bg-gray-950">
            <Link href="/">
                <span className="text-emerald-500 font-extrabold text-2xl lg:text-4xl w-1/2 cursor-pointer">
                    Money Minder
                </span>
            </Link>
            
            <div className="flex gap-2">
                {token ? (
                    <span className="text-emerald-500">
                        Hello, {userName}
                    </span>
                ) : (
                    <Link href="/login">
                        <span className="text-emerald-500 bg-slate-800 py-2 px-4 rounded hover:bg-slate-600 cursor-pointer">
                            Login
                        </span>
                    </Link>
                )}
            </div>
        </nav>
    );
}


