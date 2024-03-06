'use client'
import Link from 'next/link';
import { ChartPieIcon, CreditCardIcon, WalletIcon } from "@heroicons/react/24/outline"
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const navLinks = [
  { name: "Overview", href: "/dashboard", icon: ChartPieIcon },
  { name: "Accounts", href: "/dashboard/accounts", icon: CreditCardIcon },
  { name: "Budget", href: "/dashboard/budget", icon: WalletIcon }
]

export default function Sidebar() {
  const btnStyling = "flex h-[48px] items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-gray-900 hover:text-emerald-500 md:justify-start md:p-2 md:px-3"
  const pathname = usePathname()
  return (
    <aside className = "w-64 h-full bg-gray-950 text-white flex flex-col gap-2">
      {
        navLinks.map((link) => {
          const LinkIcon = link.icon
          return (
            <Link 
            href={link.href} 
            className={clsx(
              btnStyling,
              {'text-emerald-500 bg-gray-900': pathname === link.href}
            )} 
            key={link.name}>
              <LinkIcon className='w-8 h-8'/>
              {link.name}
            </Link>
          )
        })
      }
    </aside>
  );
}







