import { poppins } from "@/app/lib/ui/fonts";
import Sidebar from "@/app/lib/ui/dashboard/sidebar";
import Navbar from "@/app/lib/ui/dashboard/navbar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-grow">
        <Sidebar />
        <main className={`${poppins.className} flex-grow overflow-y-auto w-0`}>
          {children}
        </main>
      </div>
    </div>
  );
}


