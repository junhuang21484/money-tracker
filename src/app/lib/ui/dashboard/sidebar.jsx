import Link from 'next/link';

export default function Sidebar() {
  const btnStyling = "px-4 py-2 hover:bg-gray-700 cursor-pointer"
  return (
    <aside className = "w-64 h-full bg-gray-900 text-white flex flex-col gap-2">
        <Link href="/dashboard" className = {btnStyling}>
          Overview
        </Link>
        <Link href="/dashboard/accounts" className = {btnStyling}>
          Accounts
        </Link>
        <Link href="/dashboard/budgets" className = {btnStyling}>
          Budget
        </Link>
    </aside>
  );
}







