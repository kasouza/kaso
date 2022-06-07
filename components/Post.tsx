import Icon from "@mdi/react"
import { FC } from "react"
import { Carousel } from "react-responsive-carousel"
import { getIcon, getDisplayName } from "../lib/icons"
import { PostData } from "../lib/posts"
import Image from "next/image"
import Layout from "./Layout"

import styles from "../styles/Post.module.css"

interface PostProps {
    subDir: string,
    postData: PostData,
    images?: string[],
}

const Post: FC<PostProps> = ({ postData, images }) => {
    return (
        <Layout title={postData.title}>
            <section className="flex flex-col items-center gap-4 w-11/12 md:w-4/5 lg:w-3/5">
                <h1 className="self-start text-4xl">{postData.title}</h1>
                {images && images.length > 0 &&
                    <div className="w-full my-6 dark:border border-opacity-20 border-white">
                        <Carousel showThumbs={false}>
                            {images.map(image => (
                                <Image key={image} src={image} width={1351} height={768} layout="responsive" alt="Carousel Image" />
                            ))}
                        </Carousel>
                    </div>
                }

                {/* Little hack to make links open in new page and math is centered in the page */}
                {/* FIXME: I totally need to change this */}
                <div className={styles.container} dangerouslySetInnerHTML={{ __html: postData.content?.replaceAll('<a', '<a target="_blank"') || '' }}></div>

                <div className="grid grid-cols-1 justify-items-center md:justify-items-start items-center w-full md:w-4/5  my-16">
                    <h2 className="md:col-span-2 mb-4 text-4xl">Techs</h2>

                    <ul className="grid grid-cols-3 md:grid-cols-none md:grid-rows-3 justify-items-center md:justify-items-start gap-1">
                        {postData.techs.map(tech => (
                            <li className="flex flex-row gap-1 items-center" key={tech}>
                                <span>
                                    <Icon path={getIcon(tech) || ''} size={0.75} />
                                </span>
                                <span className="whitespace-nowrap">{getDisplayName(tech)}</span>
                            </li>
                        ))}
                    </ul>
                    {postData.demoURL &&
                        <div className="justify-items-center md:justify-self-end mt-16 md:mt-0">
                            <a target="_blank" rel="noreferrer" href={postData.demoURL} className="block whitespace-nowrap px-4 py-2 text-2xl border-default hover-default transition-colors">Try it Out!</a>
                        </div>
                    }
                </div>
            </section>
        </Layout>
    )
}

export default Post
