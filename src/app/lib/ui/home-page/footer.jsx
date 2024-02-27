import Link from "next/link";

export default function Footer() {
    return (
        <footer className="w-full flex justify-evenly text-white mt-auto h-14 items-center text-sm md:text-lg">
            <p>© Money Minder 2024</p>
            <Link href="/">
                Privacy Policy
            </Link>
            <Link href="/">
                Cookies Policy
            </Link>
            <Link href="/">
                Term of use
            </Link>
        </footer>
    )
}