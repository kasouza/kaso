import { GetStaticProps, InferGetStaticPropsType } from "next"
import Post from "../../components/Post"
import { getPostData, postsPaths, PostData } from "../../lib/posts"

export const getStaticProps: GetStaticProps = async context => {
    const data = await getPostData(context, 'area51')

    return {
        props: {
            ...data
        }
    }
}

export const getStaticPaths = () => {
    return {
        paths: postsPaths('area51'),
        fallback: false,
    }
}

const Area51Post: InferGetStaticPropsType<typeof getStaticProps> = ({ postData, images }: { postData: PostData, images: string[] }) => {
    return <Post subDir="area51" postData={postData} images={images} />
}

export default Area51Post