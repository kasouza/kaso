import Layout from "../../components/Layout";
import ProjectList from "../../components/ProjectList";
import { PostData, sortedPosts, sortPostsByDateReversed } from "../../lib/posts";

export const getStaticProps = () => {
    return {
        props: {
            posts: sortedPosts('portfolio', sortPostsByDateReversed)
        }
    }
}

export default function Portfolio({ posts }: { posts: PostData[] }) {
    return (
        <Layout title="Portfolio">
            <ProjectList subDirectory="portfolio" posts={posts} />
        </Layout>
    )
}
