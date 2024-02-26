import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="flex justify-around h-16 items-center">
            <Link href='/' className="text-emerald-500 font-extrabold text-2xl lg:text-4xl w-1/2">
                Money Minder
            </Link>
            
            <div className="flex gap-2">
                <Link href='/login' className="text-emerald-500 bg-slate-800 py-2 px-4 rounded hover:bg-slate-600">
                    Login
                </Link>
            </div>
        </nav>
    )
}