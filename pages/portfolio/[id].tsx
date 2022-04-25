import { GetStaticProps, InferGetStaticPropsType, NextPageContext } from "next"

import "../../node_modules/react-responsive-carousel/lib/styles/carousel.min.css"
import Post from "../../components/Post"
import { getPostData, postsPaths, PostData } from "../../lib/posts"

export const getStaticProps: GetStaticProps = async context => {
    const data = await getPostData(context, 'portfolio')

    return {
        props: {
            ...data
        }
    }
}

export const getStaticPaths = () => {
    return {
        paths: postsPaths('portfolio'),
        fallback: false,
    }
}

const PortfolioPost: InferGetStaticPropsType<typeof getStaticProps> = ({ postData, images }: { postData: PostData, images: string[] }) => {
    return (
        <Post subDir="portfolio" postData={postData} images={images} />
    )
}

export default PortfolioPost