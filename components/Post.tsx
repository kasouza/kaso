import Icon from "@mdi/react"
import Link from "next/link"
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
    images: string[],
}

const Post: FC<PostProps> = ({ subDir, postData, images }) => {
    return (
        <Layout title={postData.title}>
            <section className="flex flex-col items-center gap-4 w-11/12 md:w-4/5 lg:w-3/5">
                <h1 className="self-start text-4xl">{postData.title}</h1>
                <div className="w-full my-6">
                    <Carousel showThumbs={false}>
                        {images.map(image => (
                            <Image key={image} src={image} width={1351} height={768} layout="responsive" />
                        ))}
                    </Carousel>
                </div>

                <div className={styles.container} dangerouslySetInnerHTML={{ __html: postData.content || '' }}></div>

                <div className="grid grid-cols-1 justify-items-center md:justify-items-start items-center w-full md:w-4/5  my-16">
                    <h2 className="md:col-span-2 mb-4 text-4xl">Techs</h2>

                    <ul className="grid grid-rows-3 gap-1">
                        {postData.techs.map(tech => (
                            <li className="flex flex-row gap-1 items-center" key={tech}>
                                <span>
                                    <Icon path={getIcon(tech) || ''} size={0.75} />
                                </span>
                                <span className="whitespace-nowrap">{getDisplayName(tech)}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="justify-items-center md:justify-self-end mt-12 md:mt-0">
                        <Link href={`/${subDir}/demo/${postData.id}`}>
                            <a className="block whitespace-nowrap px-4 py-2 text-2xl border border-black rounded-sm hover:border-gray-700 hover:text-gray-900">Try it Out!</a>
                        </Link>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default Post