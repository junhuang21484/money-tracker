import Navbar from "@/app/lib/ui/home-page/navbar"
import {poppins} from "@/app/lib/ui/fonts"
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className={`${poppins.className} flex flex-col min-h-screen bg-gray-950`}>
      <Navbar />

      {/* Hero Section */}
      <div className="flex gap-2 text-white items-center justify-evenly">
        <div className="w-1/2 text-wrap">
          <h1 className="text-3xl md:text-4xl xl:text-6xl mb-16 mt-6 lg:mt-0">
            Manage your <div className="mt-2"></div> 
            expenses anywhere <div className="mt-2"></div> 
            in real time
          </h1>
          <Link href='/login' className="px-4 py-2 rounded bg-emerald-500	">Get started</Link>
        </div>
        
        <Image 
          src="/hero-image.png"
          alt="hero image"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '25%', height: 'auto' }}
        />
      </div>
      <hr className="w-4/5 mt-4 mx-auto"/>
    </main>
  );
}
