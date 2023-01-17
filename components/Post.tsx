import Icon from "@mdi/react"
import { FC } from "react"
import { Carousel } from "react-responsive-carousel"
import { getIcon, getDisplayName } from "../lib/icons"
import { PostData } from "../lib/posts"
import Image from "next/image"
import Head from "next/head"
import Footer from "./Footer"
import Header from "./Header"

import styles from "../styles/Post.module.css"

interface PostProps {
  subDir: string,
  postData: PostData,
  images?: string[],
}

const Post: FC<PostProps> = ({ postData, images }) => {
  let postContent = postData.content || ''

  /* Little hack to make links open in new page and math is centered in the page */ 
  /* FIXME: I totally need to change this (I guess??)*/ 
  postContent = postContent.replace('<a', '<a target="_blank"') || ''

  return (
    <div>
      <Head>
        <title>KASO - {postData.title}</title>
      </Head>
      <div className="flex flex-col items-center gap-4 min-h-screen">
        <Header />

        <main className="flex flex-col items-center gap-16 w-full">
          <div className="flex flex-col items-center gap-16 w-full">
            <section className="leading-relaxed flex flex-col items-center gap-8 md:gap-8 w-11/12 md:w-4/5 lg:w-3/5">
              {images && images.length > 0 &&
                <div className="w-full dark:border border-opacity-20 border-white">
                  <Carousel showThumbs={false}>
                    {images.map(image => (
                      <Image key={image} src={image} width={1351} height={768} layout="responsive" alt="Carousel Image" />
                    ))}
                  </Carousel>
                </div>
              }
              <h1 className="font-light self-start text-center w-full text-3xl md:text-4xl">{postData.title}</h1>

              {/* Little hack to make links open in new page and math is centered in the page */}
              {/* FIXME: I totally need to change this */}
              <div className={styles.container} dangerouslySetInnerHTML={{ __html: postContent }}></div>

              <div className="flex flex-col md:flex-row justify-between items-center gap-12 w-full md:w-4/5 mt-4 mb-16">
                <div className="flex flex-col gap-6 items-center">
                  <h2 className="md:col-span-2 text-4xl">Techs</h2>

                  <ul className="grid grid-cols-3 justify-items-center md:justify-items-start gap-4">
                    {postData.techs.map(tech => (
                      <li className="flex flex-row gap-1 items-center" key={tech}>
                        <span title={getDisplayName(tech)}>
                          <Icon path={getIcon(tech) || ''} size={1} />
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {postData.demoURL &&
                  <div className="justify-items-center">
                    <a target="_blank" rel="noreferrer" href={postData.demoURL} className="block whitespace-nowrap px-4 py-2 text-2xl border-default hover-default">Try it Out!</a>
                  </div>
                }
              </div>
            </section>
          </div>
        </main>

        <div className="flex flex-col justify-end flex-1 pb-8">
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default Post
