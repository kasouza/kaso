import Link from 'next/link'
import Layout from '../components/Layout'
import { PostData, sortedPosts, sortPostsByDate } from '../lib/posts'

export const getStaticProps = () => {
	return {
		props: {
			posts: sortedPosts('blog', sortPostsByDate, 4).reverse()
		}
	}
}

const Home = ({ posts }: { posts: PostData[] }) => {
	return (
		<Layout>
			<section className="flex flex-col gap-4 w-11/12 md:w-4/5 lg:w-3/5">
				<h1 className="font-light text-4xl">KASO</h1>
				<p>Hi! I&apos;m Kauã de Souza (kaso or kasouza), fullstack web developer, born and raised in Rio de Janeiro, Brazil and passionate about anything tech-related and this is my personal website! Here you&apos;ll find some of the projects I developed in the <Link href="/portfolio"><a className="underline underline-offset-2 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">Portfolio</a></Link>, what I&apos;ve beeing doing recently in the <Link href="/blog"><a className="underline underline-offset-2 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">Blog</a></Link> and other side projects and fun little experiments in the <Link href="/area51"><a className="underline underline-offset-2 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">Area51</a></Link>.</p>
			</section>

			<section className="flex flex-col gap-4 w-11/12 md:w-4/5 lg:w-3/5">
				<h2 className="font-light text-4xl">
					Recent Posts
				</h2>

				<div className="flex flex-col gap-1">
					{posts.length === 0
						? <h2 className="font-light mx-auto my-4 text-2xl italic md:text-3xl md:mt-8">Coming Soon...</h2>
						: posts.map((post) => (
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

export default Home
