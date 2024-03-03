import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="sidebar w-64 h-screen bg-black text-white fixed">
      <nav className="mt-10">
        <Link href="/dashboard" passHref>
          <span className="block px-4 py-2 hover:bg-gray-700 cursor-pointer">Overview</span>
        </Link>
        <Link href="/accounts" passHref>
          <span className="block px-4 py-2 hover:bg-gray-700 cursor-pointer">Accounts</span>
        </Link>
        <Link href="/budgets" passHref>
          <span className="block px-4 py-2 hover:bg-gray-700 cursor-pointer">Budgets</span>
        </Link>
      </nav>
    </aside>
  );
}




