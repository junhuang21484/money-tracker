import { poppins } from "@/app/lib/ui/fonts"
import Sidebar from "@/app/lib/ui/dashboard/sidebar"
import Navbar from "@/app/lib/ui/dashboard/navbar"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 md:overflow-hidden">

        <div className="w-full md:w-64 hidden md:block">
          <Sidebar />
        </div>
        <div className={`${poppins.className} grow md:overflow-y-auto`}>{children}</div>
      </div>
    </div>
  );
}
