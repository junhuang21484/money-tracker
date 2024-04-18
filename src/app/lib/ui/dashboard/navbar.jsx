import Link from 'next/link';
import { fetchFirstNameByUserID } from "@/app/lib/data/user";
import { getLoggedInUserID } from "@/app/lib/data/jwtToken";
import { ChartPieIcon, CreditCardIcon, UserIcon } from "@heroicons/react/24/outline"
import LogoutBtn from "./logout-btn"

export default async function Navbar( ) {
    const userId = await getLoggedInUserID()
    const userName = await fetchFirstNameByUserID(userId);

    const navLinks = [
        { name: "Overview", href: "/dashboard", icon: ChartPieIcon },
        { name: "Accounts", href: "/dashboard/accounts", icon: CreditCardIcon },
        { name: "Profile", href: "/dashboard/profile", icon: UserIcon },
    ]

    const NavLink = ({ href, name, icon: Icon }) => (
        <Link href={href} className="flex items-center text-white px-4 py-2 hover:bg-gray-900 rounded">
            <Icon className="h-5 w-5 mr-2" />
            {name}
        </Link>
    );

    return (
        <nav className="flex justify-between items-center w-full h-16 bg-gray-900 drop-shadow-lg px-2">
            <Link href="/dashboard" className='text-emerald-500 font-extrabold text-2xl lg:text-4xl w-1/2'>
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
            
            
        </nav>
    );
}

