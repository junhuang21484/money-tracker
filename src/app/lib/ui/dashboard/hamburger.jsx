"use client"
import Link from 'next/link';
import { useState } from 'react';

export default function HamburgerMenu() {
    const [isOpen, setIsOpen] = useState(false);

    const closeMenu = () => {
        setIsOpen(false);
    }

    function toggleMenu() {

        if (isOpen) {
            return "flex absolute top-[60px] bg-gray-800 w-full p-6 left-0 gap-10 flex-col z-10";
        } else {
            return "hidden";
        }
    }

    return (
        <nav className="flex justify-between items-center h-16 bg-gray-950 px-4 md:px-8 w-8">
            <div className={toggleMenu()}>
                <Link href="/dashboard" className="text-white font-bold text-lg md:text-xl px-2 py-1 hover:bg-gray-800 rounded-md md:mx-2" onClick={closeMenu}>
                Overview
                </Link>
                <Link href="/dashboard/accounts" className="text-white font-bold text-lg md:text-xl px-2 py-1 hover:bg-gray-800 rounded-md md:mx-2" onClick={closeMenu}>
                Accounts
                </Link>
                <Link href="/dashboard/budgets" className="text-white font-bold text-lg md:text-xl px-2 py-1 hover:bg-gray-800 rounded-md md:mx-2" onClick={closeMenu}>
                Budgets
                </Link>
            </div>

            <div className="flex items-center">
                <button onClick = {() => setIsOpen(!isOpen)}>
                    <svg className="w-6 h-6" fill="none" stroke="#ffffff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        {isOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        )}
                    </svg>
                </button>
            </div>
        </nav>
    );
}