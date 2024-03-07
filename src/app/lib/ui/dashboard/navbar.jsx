import Link from 'next/link';
import { cookies } from 'next/headers'; 
import { fetchFirstNameByUserID } from "@/app/lib/data/user";
import { getDataFromToken } from "@/app/lib/data/jwtToken";
import HamburgerMenu from './hamburger';

export default async function Navbar( ) {
    const cookieStored = cookies();
    const token = cookieStored.get("token");
    const userId = getDataFromToken(token.value).user_id;
    const userName = await fetchFirstNameByUserID(userId);

    return (
        <nav className="flex justify-between items-center w-full h-16 bg-gray-900 drop-shadow-lg px-2">
            <Link href="/" className='text-emerald-500 font-extrabold text-2xl lg:text-4xl w-1/2'>
                Money Minder
            </Link>

            <div className="w-1/2 text-end">
                <span className="text-emerald-500 w-full text-xl">
                    Hello, {userName}
                </span>
            </div>

            <div className='md:hidden'>
                <HamburgerMenu />
            </div>
        </nav>
    );
}

