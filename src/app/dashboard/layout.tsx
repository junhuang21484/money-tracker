import { poppins } from "@/app/lib/ui/fonts"
import Sidebar from "@/app/lib/ui/dashboard/sidebar"
import Navbar from "@/app/lib/ui/dashboard/navbar"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar />
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        
        <div className="w-full flex-none md:w-64">
          <Sidebar />
        </div>
        <div className={`${poppins.className} grow md:overflow-y-auto`}>{children}</div>
      </div>
    </div>

  );
}
