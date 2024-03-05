import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="hidden md:block md:w-64 bg-gray-950 text-white">
      <nav className="mt-10">
        <Link href="/dashboard" passHref>
          <span className="block px-4 py-2 hover:bg-gray-700">Overview</span>
        </Link>
        <Link href="/dashboard/accounts" passHref>
          <span className="block px-4 py-2 hover:bg-gray-700">Accounts</span>
        </Link>
        <Link href="/dashboard/budgets" passHref>
          <span className="block px-4 py-2 hover:bg-gray-700">Budgets</span>
        </Link>
      </nav>
    </aside>
  );
}







