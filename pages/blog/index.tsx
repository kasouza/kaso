import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import { PostData, sortedPosts, sortPostsByDate } from "../../lib/posts";

export const getStaticProps = () => {
    return {
        props: {
            posts: sortedPosts('blog', sortPostsByDate).reverse()
        }
    }
}

export default function Blog({ posts }: { posts: PostData[] }) {
    return (
        <Layout title="Blog">
            <section className="flex flex-col gap-4 w-11/12 md:w-4/5 lg:w-3/5">
                <h1 className="text-4xl">Blog</h1>
                <p>Welcome to my Blog! Here you&apos;ll find what I&apos;ve been up to recenlty. Projects I&apos;m workin on, nice tricks I discovered and anything more I feel like posting.</p>
                <div className="flex flex-col gap-1">
                    {posts.length === 0
                        ? <h2 className="mx-auto my-4 text-2xl italic md:text-3xl md:mt-8">Coming Soon...</h2>
                        : posts.map(post => (
                            <Link key={post.id} href={`/blog/${post.id}`}>
                                <a className="flex gap-8 hover:text-gray-700 dark:hover:text-gray-300">
                                    <span className="whitespace-nowrap">{post.date.toLocaleDateString()}</span>
                                    <span className="whitespace-nowrap text-ellipsis overflow-hidden">{post.description}</span>
                                </a>
                            </Link>
                        ))
                    }
                </div>
            </section>
        </Layout>
    )
}