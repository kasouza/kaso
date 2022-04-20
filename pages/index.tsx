import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout'

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>KASO</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <section className="flex flex-col gap-4 w-3/5">
          <h1 className="text-4xl">KASO</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa totam, voluptatum in aperiam inventore incidunt deleniti ut deserunt vitae harum qui nesciunt voluptate ipsa veritatis quaerat iure autem maiores? Ratione officiis illo quas eos consectetur repudiandae ducimus facere, odio labore, expedita id magnam vero in accusamus. Inventore nulla aliquid veritatis?</p>
        </section>

        <section className="flex flex-col gap-4 w-3/5">
          <h2 className="text-4xl">
            Recent Posts
          </h2>

          <div className="flex flex-col gap-1">
            <Link href="/">
              <a className="flex gap-8 hover:font-medium">
                <span>22/02/2022</span>
                <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, alias.</span>
              </a>
            </Link>
            <Link href="/">
              <a className="flex gap-8 hover:font-medium">
                <span>22/02/2022</span>
                <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, alias.</span>
              </a>
            </Link>
            <Link href="/">
              <a className="flex gap-8 hover:font-medium">
                <span>22/02/2022</span>
                <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, alias.</span>
              </a>
            </Link>
            <Link href="/">
              <a className="flex gap-8 hover:font-medium">
                <span>22/02/2022</span>
                <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, alias.</span>
              </a>
            </Link>
            <Link href="/">
              <a className="flex gap-8 hover:font-medium">
                <span>22/02/2022</span>
                <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, alias.</span>
              </a>
            </Link>
          </div>
        </section>
      </Layout>
    </div>
  )
}

export default Home
