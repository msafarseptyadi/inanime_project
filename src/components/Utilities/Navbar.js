"use client";

import '@fortawesome/fontawesome-free/css/all.min.css';
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import React, { useContext } from "react";
import { ValueContext } from "@/contexts/ValueContext";


export default function Navbar(){
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const isAnimeDetail = pathname.startsWith('/anime/');
    const { sharedValue } = useContext(ValueContext);
    const headerImage = isAnimeDetail && sharedValue
    ? sharedValue
    : "https://s4.anilist.co/file/anilistcdn/media/anime/banner/178025-KH3NSrRChfGy.jpg";
    return(
        <>
        <header className={`relative h-100 bg-cover bg-center`} style={{ backgroundImage: `url(${headerImage})` }}>     
            <div className="absolute inset-0 bg-black/50"></div>
            <nav className="bg-white border-gray-200 dark:bg-gray-900 z-100 relative">
                <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link href={`/`} className="cursor-pointer">
                        <Image src={"/inanime.png"} width={150} height={100} alt="" className="object-cover"/>
                    </Link>
                    <div className="flex md:hidden md:order-2">
                        <button onClick={() => setIsOpen(!isOpen)} data-collapse-toggle="navbar-search" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700" aria-controls="navbar-search" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <i className="fa-solid fa-bars text-2xl text-gray-700"></i>
                        </button>
                    </div>
                    <div className={`${isOpen ? "block" : "hidden"} items-center justify-between w-full md:flex md:w-auto md:order-1"`} id="navbar-search">
                        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <Link
                            href="/"
                            className={`block py-2 px-3 rounded-sm md:p-0 ${
                                pathname === "/"
                                ? "text-white bg-blue-700 md:bg-transparent md:text-blue-700 md:dark:text-blue-500"
                                : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                            }`}
                            aria-current={pathname === "/" ? "page" : undefined}
                            >
                            Home
                            </Link>
                        </li>
                        <li>
                            <Link
                            href="/mybookmark"
                            className={`block py-2 px-3 rounded-sm md:p-0 ${
                                pathname === "/mybookmark"
                                ? "text-white bg-blue-700 md:bg-transparent md:text-blue-700 md:dark:text-blue-500"
                                : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                            }`}
                            aria-current={pathname === "/mybookmark" ? "page" : undefined}
                            >
                            My Bookmark
                            </Link>
                        </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
        </>
    )
}