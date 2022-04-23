import Layout from "../components/Layout";
import ProjectList from "../components/ProjectList";
import { Post, sortedPosts, sortPostsByDate } from "../lib/posts";

export const getStaticProps = () => {
    return {
        props: {
            posts: sortedPosts('area51', sortPostsByDate).reverse()
        }
    }
}


export default function Area51({ posts }: { posts: Post[] }) {
    return (
        <Layout>
            <section className="flex flex-col w-full items-center gap-12">
                <div className="flex flex-col gap-4 w-11/12 md:w-4/5 lg:w-3/5 mx-auto">
                    <h1 className="text-4xl">Area 51</h1>
                    <p>Hi, again! Here at the Area 51 we have some of the craziest experiments and little projects I developed. I really love graphics programming (and programming in general), so expect to find some cool things in here.</p>
                </div>

                {posts.length === 0
                    ? <h2 className="my-4 text-6xl">Coming Soon...</h2>
                    : <ProjectList subDirectory="area51" posts={posts} />
                }

            </section>
        </Layout>
    )
}