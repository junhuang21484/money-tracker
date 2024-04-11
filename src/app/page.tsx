import Navbar from "@/app/lib/ui/home-page/navbar";
import Footer from "@/app/lib/ui/home-page/footer";
import EmailSection from "@/app/lib/ui/home-page/email-section";
import InfoDisplay from "@/app/lib/ui/home-page/info-display";
// import { poppins } from "@/app/lib/ui/fonts";

import HeroSection from "@/app/lib/ui/home-page/hero-section";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#121212]">
      <Navbar />
      <div className="container mt-24 mx-auto py-4 px-12">
        <HeroSection />

        <div className="flex flex-col md:flex-row w-full mt-10 mb-10 border z-10 border-t-[#33353F] border-b-[#33353F] border-l-transparent border-r-transparent text-white">
          <InfoDisplay
            imgSrc="/homepage/graph-icon.png"
            title="Analytics"
            description="Gain deeper insights into your spending habits with our powerful analytics tools. 
            Visualize your expenditure patterns, identify trends, and pinpoint areas for improvement. 
            Empower yourself with the knowledge to make informed financial decisions."
          />
          <InfoDisplay
            imgSrc="/homepage/automation-icon.png"
            title="Automation"
            description="Let automation take the burden off your shoulders. 
            Our intuitive system tracks your expenses effortlessly, categorizing them accurately without manual input. 
            Spend less time managing your finances and more time living your life."
          />
          <InfoDisplay
            imgSrc="/homepage/folder-icon.png"
            title="All In One"
            description="Simplify your financial management with our all-in-one solution. 
            Whether it's bank accounts, credit cards, or investments, access all your financial data in a single platform. 
            Streamline your finances and stay organized with ease."
          />
        </div>

        <EmailSection />
        <Footer />
      </div>
    </main>
  );
}
