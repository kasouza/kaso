import { GetStaticProps } from "next";
import { FC } from "react";
import DemoPost from "../../../components/DemoPost";
import { demoPaths, demoPostData, PostData, readPost } from "../../../lib/posts";


export const getStaticProps: GetStaticProps = async context => demoPostData(context, 'blog')

export const getStaticPaths = () => {
    return {
        paths: demoPaths('blog'),
        fallback: false,
    }
}

interface BlogDemoProps {
    postData?: PostData
}

const BlogDemo: FC<BlogDemoProps> = ({ postData }) => <DemoPost id={postData?.id || ''} title={postData?.title || ''} subDir="blog" />

export default BlogDemo