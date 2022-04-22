import { GetStaticProps, InferGetStaticPropsType } from "next"
import { Carousel } from "react-responsive-carousel"
import Layout from "../../components/Layout"
import { getPostCarouselImages, Post, readFile, staticPaths } from "../../lib/posts"
import Image from 'next/image'

import styles from "../../styles/Post.module.css"

export const getStaticProps: GetStaticProps = async context => {
    const { id }: { id: string } = context.params as any

    const postData = await readFile('area51', id)
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
            </section>
        </Layout>
    )
}

export default Area51Post