import Head from "next/head";
import { FC } from "react";
import Footer from "./Footer";
import Header from "./Header";

interface DemoLayoutProps {
    title: string,
    iframeSrc: string,
}

const DemoLayout: FC<DemoLayoutProps> = ({ title, iframeSrc }) => {
    return (
        <div className="flex flex-col w-full min-h-screen">
            <Head>
                <title>KASO - {title}</title>
            </Head>
            <div>
                <Header />
            </div>

            <main className="relative flex flex-col items-center w-full h-full flex-1">
                <iframe className={"bg-white absolute inset-0 w-full h-full"} src={iframeSrc} frameBorder="0"></iframe>
            </main>
        </div>
    )
}

export default DemoLayout