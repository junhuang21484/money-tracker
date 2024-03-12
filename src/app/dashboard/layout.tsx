import { poppins } from "@/app/lib/ui/fonts"
import Navbar from "@/app/lib/ui/dashboard/navbar"
import { HamburgerMenu } from "@/app/lib/ui/dashboard/hamburger"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full min-h-screen flex flex-col">
      <div className="flex w-full">
        <Navbar />
        <div className='md:hidden'>
          <HamburgerMenu />
        </div>
      </div>

      <div className="flex flex-1 md:overflow-hidden">
        <div className={`${poppins.className} grow md:overflow-y-auto`}>{children}</div>
      </div>
    </div>
  );
}
