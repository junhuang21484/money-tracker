import Navbar from "@/app/lib/ui/home-page/navbar"
import Footer from "@/app/lib/ui/home-page/footer"
import ContactForm from "@/app/lib/ui/home-page/contact-form"
import InfoDisplay from "@/app/lib/ui/home-page/info-display"
import { poppins } from "@/app/lib/ui/fonts"
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className={`${poppins.className} flex flex-col min-h-screen bg-gray-950`}>
      <Navbar />

      {/* Hero Section */}
      <div className="flex flex-col items-center"> {/* Added items-center class */}
        <div className="flex text-white items-center justify-evenly">
          <div className="w-1/2 text-wrap">
            <h1 className="text-3xl md:text-4xl xl:text-6xl mb-16 mt-6 lg:mt-0">
              Manage your <div className="mt-2"></div> 
              expenses anywhere <div className="mt-2"></div> 
              in real time
            </h1>
            <Link href='/login' className="px-4 py-2 rounded bg-emerald-500	">Get started</Link>
          </div>
          
          <Image 
            src="/homepage/hero-image.png"
            alt="hero image"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '25%', height: 'auto' }}
          />
        </div>
      </div>

      <hr className="w-4/5 mt-4 mx-auto"/>
      
      <div className="flex w-full mt-10 mb-6">
        <InfoDisplay  
        imgSrc="/homepage/graph-icon.png" title="Analytics"
        description="Breakdown your spending with graphs and analytics"
        />

        <InfoDisplay  
        imgSrc="/homepage/automation-icon.png" title="Automation"
        description="We do the tracking automatically, to save the hassle from you"
        />

        <InfoDisplay  
        imgSrc="/homepage/folder-icon.png" title="All In One"
        description="Have all your accounts in one place, and we do the work for all of them"
        />
      </div>

      <hr className="w-4/5 mt-4 mx-auto"/>

      <div className="flex mt-10 items-center justify-evenly">
        <div className="text-white w-full md:w-1/2">
          <ContactForm />
        </div>

        <Image 
            src="/homepage/business-man.png"
            alt="business man image"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '20%', height: 'auto' }}
            className="hidden md:block"
          />
      </div>

      <hr className="w-4/5 mt-4 mx-auto"/>
      <Footer />
    </main>
  );
}
