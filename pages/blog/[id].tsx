import { GetStaticProps } from "next"
import { FC } from "react"
import Post from "../../components/Post"
import { getPostData, postsPaths, PostData } from "../../lib/posts"

export const getStaticProps: GetStaticProps = async context => {
    const data = await getPostData(context, 'blog')

    return {
        props: {
            ...data
        }
    }
}

export const getStaticPaths = () => {
    return {
        paths: postsPaths('blog'),
        fallback: false,
    }
}

interface BlogPostProps { postData: PostData, images: string[] }

const BlogPost: FC<BlogPostProps> = ({ postData, images }) => {
    return <Post subDir="blog" postData={postData} images={images} />
}

export default BlogPost