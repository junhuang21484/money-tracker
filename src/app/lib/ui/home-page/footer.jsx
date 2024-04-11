import Link from "next/link";

const Footer = () => {
  return (
    <footer className="footer border z-10 border-t-[#33353F] border-l-transparent border-r-transparent text-white">
      <div className="container p-4 md:p-12 flex flex-col md:flex-row justify-between items-center">
        <Link href="/">MoneyMinder</Link>
        <Link href="/">Privacy Policy</Link>
        <Link href="/">Cookies Policy</Link>
        <Link href="/">Term of use</Link>
        <p className="text-slate-600">&copy;All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
