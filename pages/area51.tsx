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
            <section className="flex flex-col items-center gap-12">
                <div className="flex flex-col gap-4 w-3/5 mx-auto">
                    <h1 className="text-4xl">Area 51</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi molestias dolorum dignissimos nihil quam? Quod sint reprehenderit architecto! Vitae harum praesentium ratione nostrum repellat soluta deleniti mollitia illum ab labore at veritatis itaque explicabo laboriosam, adipisci dolorum non vero doloremque nobis illo magnam magni a! Nisi quasi ut vel earum.</p>
                </div>

                <ProjectList subDirectory="area51" posts={posts} />
            </section>
        </Layout>
    )
}