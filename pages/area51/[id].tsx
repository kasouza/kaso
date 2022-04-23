import { GetStaticProps, InferGetStaticPropsType } from "next"
import { Carousel } from "react-responsive-carousel"
import Layout from "../../components/Layout"
import { getPostCarouselImages, Post, readPost, staticPaths } from "../../lib/posts"
import Image from 'next/image'

import styles from "../../styles/Post.module.css"
import Icon from "@mdi/react"
import Link from "next/link"
import { getIcon, getDisplayName } from "../../lib/icons"

export const getStaticProps: GetStaticProps = async context => {
    const { id }: { id: string } = context.params as any
    
    const postData = await readPost('area51', id)
    const images = getPostCarouselImages('area51', id)

    return {
        props: {
            postData,
            images
        }
    }
}

export const getStaticPaths = () => {
    return {
        paths: staticPaths('area51'),
        fallback: false,
    }
}

const Area51Post: InferGetStaticPropsType<typeof getStaticProps> = ({ postData, images }: { postData: Post, images: string[] }) => {
    return (
        <Layout>
            <section className="flex flex-col gap-4 w-3/5">
                <h1 className="text-4xl">{postData.title}</h1>
                <div className="w-full my-6">
                    <Carousel showThumbs={false}>
                        {images.map(image => (
                            <Image key={image} src={image} width={1351} height={768} layout="responsive" />
                        ))}
                    </Carousel>
                </div>
                <div className={styles.container} dangerouslySetInnerHTML={{ __html: postData.content || '' }}></div>
                <div className="grid grid-cols-2 items-center w-4/5  my-16">
                    <h2 className="col-span-2  mb-4 text-4xl">Techs</h2>

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
                    <div className="justify-self-end">
                        <Link href={`/portfolio/demo/${postData.id}`}>
                            <a className="block whitespace-nowrap px-4 py-2 text-2xl border border-black rounded-sm hover:border-gray-700 hover:text-gray-900">Try it Out!</a>
                        </Link>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default Area51Post