import Link from "next/link";
import Hamburger from "./Hamburger";

export default function Header() {
    return (
        // Position relative is needed for the Hamburger
        <header className="flex justify-center items-center w-full py-6 relative"> 
            <div className="flex justify-between items-center w-11/12">
                <Link href="/"><a><span className="text-2xl hover:relative hover:text-gray-700 transition-colors">KASO</span></a></Link>

                <Hamburger>
                    {/* <Link href="/"><a>Home</a></Link> */}
                    <Link href="/blog"><a className="hover:text-gray-700 transition-colors">Blog</a></Link>
                    <Link href="/portfolio"><a className="hover:text-gray-700 transition-colors">Portfolio</a></Link>
                    <Link href="/contact"><a className="hover:text-gray-700 transition-colors">Contact</a></Link>
                    <Link href="/area51"><a className="hover:text-gray-700 transition-colors">Area 51</a></Link>
                </Hamburger>
            </div>
        </header>
    )
}