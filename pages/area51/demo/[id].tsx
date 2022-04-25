import { GetStaticProps } from "next";
import { FC } from "react";
import DemoPost from "../../../components/DemoPost";
import { demoPostData, demoPaths, PostData } from "../../../lib/posts";

export const getStaticProps: GetStaticProps = async context => demoPostData(context, 'area51')

export const getStaticPaths = () => {
    return {
        paths: demoPaths('area51'),
        fallback: false,
    }
}

interface Area51DemoProps {
    postData?: PostData
}

const Area51Demo: FC<Area51DemoProps> = ({ postData }) => <DemoPost id={postData?.id || ''} title={postData?.title || ''} subDir="area51" />

export default Area51Demo