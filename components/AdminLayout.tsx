import Head from "next/head"
import Footer from "./Footer"
import Header from "./Header"

interface LayoutProps {
	title?: string,
	desc?: string,
	children: React.ReactNode
}

export default function AdminLayout({ title, desc, children }: LayoutProps) {
	return (
		<div>
			<Head>
				<title>KASO ADMIN {title && `- ${title}`}</title>
			</Head>
			<div className="flex flex-col items-center gap-4 min-h-screen">
				<Header />

				<main className="flex flex-col items-center gap-16 w-full leading-relaxed">
					<div className="flex flex-col items-center gap-16 w-full">
						<div className="flex flex-col gap-8 w-11/12 md:w-4/5 lg:w-3/5 mx-auto">
							<h1 className="font-light text-center text-4xl">{title}</h1>
							{desc && <p>{desc}</p>}
						</div>
						{children}
					</div>
				</main>

				<div className="flex flex-col justify-end mt-16 flex-1 pb-8">
					<Footer />
				</div>
			</div>
		</div>
	)
}
