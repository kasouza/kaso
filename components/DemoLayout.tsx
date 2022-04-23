import { FC } from "react";
import Footer from "./Footer";
import Header from "./Header";

interface DemoLayoutProps {
    iframeSrc: string,
}

const DemoLayout: FC<DemoLayoutProps> = ({ iframeSrc }) => {
    return (
        <div className="flex flex-col w-full min-h-screen">
            <div>
                <Header />
            </div>

            <main className="relative flex flex-col items-center w-full h-full flex-1">
                <iframe className={"absolute inset-0 w-full h-full"} src={iframeSrc} frameBorder="0"></iframe>
            </main>
        </div>
    )
}

export default DemoLayout