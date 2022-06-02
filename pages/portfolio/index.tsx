import Head from "next/head";
import Layout from "../../components/Layout";
import ProjectList from "../../components/ProjectList";
import { PostData, sortedPosts, sortPostsByDate } from "../../lib/posts";

export const getStaticProps = () => {
    return {
        props: {
            posts: sortedPosts('portfolio', sortPostsByDate).reverse()
        }
    }
}

export default function Portfolio({ posts }: { posts: PostData[] }) {
    return (
        <Layout title="Portfolio">
            <section className="flex flex-col items-center gap-12">
                <div className="flex flex-col gap-4 w-11/12 md:w-4/5 lg:w-3/5 mx-auto">
                    <h1 className="text-4xl">Portfolio</h1>
                    <p>Welcome to my Portfolio! Here you&apos;ll find some of the projects I worked on, most of which are websites or web related projects, with some exceptions, of course. Feel free to explore and try out all of them!</p>
                </div>

                <ProjectList subDirectory="portfolio" posts={posts} />
            </section>
        </Layout>
    )
}