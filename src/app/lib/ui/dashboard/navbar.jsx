import Link from 'next/link';
import { cookies } from 'next/headers';
import { fetchFirstNameByUserID } from "@/app/lib/data/user";
import { getDataFromToken } from "@/app/lib/data/jwtToken";
import { HamburgerMenu } from './hamburger';
import { ChartPieIcon, CreditCardIcon, WalletIcon } from "@heroicons/react/24/outline"
import LogoutBtn from "./logout-btn"

export default async function Navbar() {
    const cookieStored = cookies();
    const token = cookieStored.get("token");
    const userId = getDataFromToken(token.value).user_id;
    const userName = await fetchFirstNameByUserID(userId);

    const navLinks = [
        { name: "Overview", href: "/dashboard", icon: ChartPieIcon },
        { name: "Accounts", href: "/dashboard/accounts", icon: CreditCardIcon },
        { name: "Budget", href: "/dashboard/budget", icon: WalletIcon }
    ]

    const NavLink = ({ href, name, icon: Icon }) => (
        <Link href={href} className="flex items-center text-white px-4 py-2 hover:bg-gray-900 rounded">
            <Icon className="h-5 w-5 mr-2" />
            {name}
        </Link>
    );

    return (
        <nav className="flex justify-between items-center w-full h-16 bg-gray-950 px-2">
            <Link href="/" className='text-emerald-500 font-extrabold text-2xl lg:text-4xl w-1/2'>
                Money Minder
            </Link>
            <div className="hidden md:flex space-x-4">
                {navLinks.map((link) => <NavLink key={link.name} href={link.href} name={link.name} icon={link.icon} />)}
            </div>

            <div className="w-1/2 text-end">
                <span className="text-emerald-500 w-full text-xl">
                    Hello, {userName}
                </span>
            </div>

            <LogoutBtn />
            <div className='md:hidden'>
                <HamburgerMenu />
            </div>
            
        </nav>
    );
}

