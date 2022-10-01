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
			<div className="flex flex-col gap-1">
				{posts.length === 0
					? <h2 className="font-thin mx-auto my-4 text-2xl md:text-3xl italic md:mt-8">Coming Soon...</h2>
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
		</Layout>
	)
}
