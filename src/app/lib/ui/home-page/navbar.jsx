import Link from "next/link";
import { cookies } from "next/headers";

export default function Navbar() {
  const cookieStore = cookies();
  const isLoggedIn = cookieStore.get("token");
  return (
    <nav className="fixed mx-auto top-0 left-0 right-0 z-10 bg-[#121212] bg-opacity-98">
      <div className="flex container lg:py-4 flex-wrap items-center justify-between mx-auto px-12 py-2">
        <Link
          href="/"
          className="text-2xl md:text-4xl text-white font-semibold"
        >
          MoneyMinder
        </Link>
        <div className="flex p-4 md:p-0 md:flex-row md:space-x-8 mt-0">
          <Link
            href={isLoggedIn ? "/dashboard" : "/login"}
            className="bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-6 rounded"
          >
            {isLoggedIn ? "Dashboard" : "Login"}
          </Link>
        </div>
      </div>
    </nav>
  );
}
