import { mdiMoonWaxingCrescent, mdiWhiteBalanceSunny } from "@mdi/js";
import Icon from "@mdi/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Hamburger from "./Hamburger";

export default function Header() {
    const [isDark, setIsDark] = useState(false)

    useEffect(() => {
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
        setIsDark(prefersDarkMode)
        console.log(prefersDarkMode)
    }, [])

    useEffect(() => {
        const html = document.querySelector('html')
        if (html) {
            if (isDark) html.classList.add('dark')
            else html.classList.remove('dark')
        }
    })

    const toggleDarkMode = () => {
        setIsDark(!isDark)
    }
    return (
        // Position relative is needed for the Hamburger
        <header className="flex justify-center items-center w-full py-6 relative">
            <div className="flex justify-between items-center w-11/12">
                <Link href="/"><a><span className="text-2xl hover:relative hover:text-gray-700 dark:hover:text-gray-300 transition-colors">KASO</span></a></Link>

                <Hamburger>
                    <Link href="/"><a className="whitespace-nowrap hover:text-gray-700 dark:hover:text-gray-300 transition-colors w-full text-center">Home</a></Link>
                    <Link href="/blog"><a className="whitespace-nowrap hover:text-gray-700 dark:hover:text-gray-300 transition-colors w-full text-center">Blog</a></Link>
                    <Link href="/portfolio"><a className="whitespace-nowrap hover:text-gray-700 dark:hover:text-gray-300 transition-colors w-full text-center">Portfolio</a></Link>
                    <Link href="/contact"><a className="whitespace-nowrap hover:text-gray-700 dark:hover:text-gray-300 transition-colors w-full text-center">Contact</a></Link>
                    <Link href="/area51"><a className="whitespace-nowrap hover:text-gray-700 dark:hover:text-gray-300 transition-colors w-full text-center">Area 51</a></Link>
                    <button title="Switch color scheme" className="w-full text-center flex justify-center items-center pb-2 pt-8 md:py-0 border-t md:border-none border-t-gray-300 dark:border-t-gray-800" onClick={toggleDarkMode}><Icon path={isDark ? mdiWhiteBalanceSunny : mdiMoonWaxingCrescent } rotate={35} size={1} /></button>
                </Hamburger>
            </div>
        </header>
    )
}