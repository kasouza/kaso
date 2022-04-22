import Layout from "../components/Layout";
import ProjectList from "../components/ProjectList";
import { Post, sortedPosts, sortPostsByDate } from "../lib/posts";

export const getStaticProps = () => {
    return {
        props: {
            posts: sortedPosts('portfolio', sortPostsByDate).reverse()
        }
    }
}

export default function Portfolio({ posts }: { posts: Post[] }) {
    return (
        <Layout>
            <section className="flex flex-col items-center gap-12">
                <div className="flex flex-col gap-4 w-11/12 md:w-4/5 lg:w-3/5 mx-auto">
                    <h1 className="text-4xl">Portfolio</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi molestias dolorum dignissimos nihil quam? Quod sint reprehenderit architecto! Vitae harum praesentium ratione nostrum repellat soluta deleniti mollitia illum ab labore at veritatis itaque explicabo laboriosam, adipisci dolorum non vero doloremque nobis illo magnam magni a! Nisi quasi ut vel earum.</p>
                </div>

                <ProjectList subDirectory="portfolio" posts={posts} />
            </section>
        </Layout>
    )
}