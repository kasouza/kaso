import { mdiMoonWaxingCrescent, mdiWhiteBalanceSunny } from "@mdi/js";
import Icon from "@mdi/react";
import Link from "next/link";
import { useCallback, useContext } from "react";
import Hamburger from "./Hamburger";
import { ThemeContext } from "./ThemeProvider";

export default function Header() {
	const { theme, setTheme } = useContext(ThemeContext);

	const toggleTheme = useCallback(() => {
		if (setTheme) {
			setTheme(theme === 'light' ? 'dark' : 'light')
		}
	}, [theme, setTheme])

	return (
		// Position relative is needed for the Hamburger
		<header className="flex justify-center items-center w-full py-6 relative">
			<div className="flex justify-between items-center w-11/12">
				<Link href="/"><a><span className="font-light text-3xl hover:text-gray-700 dark:hover:text-gray-300 transition-colors">KASO</span></a></Link>

				<Hamburger>
					<Link href="/"><a className="whitespace-nowrap hover:text-gray-700 dark:hover:text-gray-300 transition-colors w-full text-center">Home</a></Link>
					<Link href="/blog"><a className="whitespace-nowrap hover:text-gray-700 dark:hover:text-gray-300 transition-colors w-full text-center">Blog</a></Link>
					<Link href="/portfolio"><a className="whitespace-nowrap hover:text-gray-700 dark:hover:text-gray-300 transition-colors w-full text-center">Portfolio</a></Link>
					<Link href="/cool-stuff"><a className="whitespace-nowrap hover:text-gray-700 dark:hover:text-gray-300 transition-colors w-full text-center">Cool stuff</a></Link>
					<Link href="/contact"><a className="whitespace-nowrap hover:text-gray-700 dark:hover:text-gray-300 transition-colors w-full text-center">Contact</a></Link>
					<button title="Change color scheme" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors w-full text-center flex justify-center items-center pt-4 md:py-0 border-t border-none border-t-gray-300 dark:border-t-gray-800  dark:translate-y-0.5" onClick={toggleTheme}>
						<Icon path={theme === 'dark' ? mdiWhiteBalanceSunny : mdiMoonWaxingCrescent} rotate={theme === 'dark' ? 0 : 35} size={1} />
					</button>
				</Hamburger>
			</div>
		</header>
	)
}
