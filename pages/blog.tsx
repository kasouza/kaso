import Link from "next/link";
import Layout from "../components/Layout";

export default function Blog() {
    return (
        <Layout>
            <section className="flex flex-col gap-4 w-3/5">
                <h1 className="text-4xl">Blog</h1>
                <div className="flex flex-col gap-1">
                    <Link href="/">
                        <a className="flex gap-8">
                            <span>22/02/2022</span>
                            <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, alias.</span>
                        </a>
                    </Link>
                    <Link href="/">
                        <a className="flex gap-8">
                            <span>22/02/2022</span>
                            <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, alias.</span>
                        </a>
                    </Link>
                    <Link href="/">
                        <a className="flex gap-8">
                            <span>22/02/2022</span>
                            <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, alias.</span>
                        </a>
                    </Link>
                    <Link href="/">
                        <a className="flex gap-8">
                            <span>22/02/2022</span>
                            <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, alias.</span>
                        </a>
                    </Link>
                    <Link href="/">
                        <a className="flex gap-8">
                            <span>22/02/2022</span>
                            <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, alias.</span>
                        </a>
                    </Link>
                </div>
            </section>
        </Layout>
    )
}