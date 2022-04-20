import Footer from "./Footer"
import Header from "./Header"

interface LayoutProps {
    children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="flex flex-col items-center gap-4 min-h-screen">
            <Header />

            <main className="flex flex-col items-center gap-16 my-4 w-full leading-relaxed">
                {children}
            </main>

            <div className="flex flex-col justify-end flex-1 pb-8">
                <Footer />
            </div>
        </div>
    )
}