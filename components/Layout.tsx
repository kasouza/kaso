import Head from "next/head"
import Footer from "./Footer"
import Header from "./Header"

interface LayoutProps {
    title?: string,
    children: React.ReactNode
}

export default function Layout({ title, children }: LayoutProps) {
    return (
        <div>
            <Head>
                <title>KASO {title && `- ${title}`}</title>
            </Head>
            <div className="flex flex-col items-center gap-4 min-h-screen">
                <Header />

                <main className="flex flex-col items-center gap-16 my-4 w-full leading-relaxed">
                    {children}
                </main>

                <div className="flex flex-col justify-end flex-1 pb-8">
                    <Footer />
                </div>
            </div>
        </div>
    )
}