import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout'
import { Post, sortedPosts, sortPostsByDate } from '../lib/posts'

export const getStaticProps = () => {
  return {
    props: {
      posts: sortedPosts('blog', sortPostsByDate, 4).reverse()
    }
  }
}

const Home = ({ posts }: { posts: Post[] }) => {
  return (
    <div className="">
      <Head>
        <title>KASO</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <section className="flex flex-col gap-4 w-11/12 md:w-4/5 lg:w-3/5">
          <h1 className="text-4xl">KASO</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa totam, voluptatum in aperiam inventore incidunt deleniti ut deserunt vitae harum qui nesciunt voluptate ipsa veritatis quaerat iure autem maiores? Ratione officiis illo quas eos consectetur repudiandae ducimus facere, odio labore, expedita id magnam vero in accusamus. Inventore nulla aliquid veritatis?</p>
        </section>

        <section className="flex flex-col gap-4 w-11/12 md:w-4/5 lg:w-3/5">
          <h2 className="text-4xl">
            Recent Posts
          </h2>

          <div className="flex flex-col gap-1">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`}>
                <a className="flex gap-8 hover:font-medium">
                  <span className="whitespace-nowrap">{post.date.toLocaleDateString()}</span>
                  <span className="whitespace-nowrap text-ellipsis overflow-hidden">{post.description}</span>
                </a>
              </Link>
            ))}
          </div>
        </section>
      </Layout>
    </div>
  )
}

export default Home
