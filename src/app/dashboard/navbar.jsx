import Link from 'next/link';
import { cookies } from 'next/headers'; 

export default function Navbar() {
    const cookieStore = cookies();
    const isLoggedIn = cookieStore.get("token");
    const username = cookieStore.get("username");

    return (
        <nav className="flex justify-around h-16 items-center">
            <Link href="/">
                <span className="text-emerald-500 font-extrabold text-2xl lg:text-4xl w-1/2 cursor-pointer">
                    Money Minder
                </span>
            </Link>
            
            <div className="flex gap-2">
                {isLoggedIn ? (
                    <span className="text-emerald-500">
                        Hello, {username}
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


