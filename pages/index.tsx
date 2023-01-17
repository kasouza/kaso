import Link from 'next/link'
import Head from "next/head"
import Footer from "../components/Footer"
import Header from "../components/Header"
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
		<div>
			<Head>
				<title>KASO</title>
			</Head>
			<div className="flex flex-col items-center gap-4 min-h-screen">
				<Header />

				<main className="flex flex-col items-center gap-16 my-4 w-full leading-relaxed">
					<section className="flex flex-col items-center gap-16 w-full">
						<div className="flex flex-col gap-12 md:gap-4 w-11/12 md:w-4/5 lg:w-3/5 mx-auto">
							<h1 className="font-light text-center md:text-left text-4xl">Hello, there!</h1>
							<p className="text-justify">I&apos;m Kauã de Souza (kaso or kasouza), fullstack web developer, born and raised in Rio de Janeiro, Brazil and passionate about anything tech-related and this is my personal website! Here you&apos;ll find some of the projects I developed in the <Link href="/portfolio"><a className="underline underline-offset-2 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">Portfolio</a></Link>, what I&apos;ve beeing doing recently in the <Link href="/blog"><a className="underline underline-offset-2 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">Blog</a></Link> and other side projects and fun little experiments in the <Link href="/area51"><a className="underline underline-offset-2 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">Area 51</a></Link>.</p>
						</div>
					</section>

					<section className="flex flex-col gap-4 w-11/12 md:w-4/5 lg:w-3/5">
						<h2 className="text-center w-full font-light text-4xl">
							Recent Posts
						</h2>

						<div className="flex flex-col gap-1">
							{posts.length === 0
								? <h2 className="text-center font-thin mx-auto my-4 text-2xl italic md:text-3xl">Coming Soon...</h2>
								: posts.map((post) => (
									<Link key={post.id} href={`/blog/${post.id}`}>
										<a className="flex gap-8 hover:text-gray-700 dark:hover:text-gray-300">
											<span className="whitespace-nowrap">{post.date.toLocaleDateString('en-GB')}</span>
											<span className="whitespace-nowrap text-ellipsis overflow-hidden">{post.description}</span>
										</a>
									</Link>
								))
							}
						</div>
					</section>
				</main>

				<div className="flex flex-col justify-end flex-1 pb-8">
					<Footer />
				</div>
			</div>
		</div>
	)
}

export default Home
