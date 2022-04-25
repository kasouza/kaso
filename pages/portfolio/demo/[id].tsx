import { GetStaticProps } from "next";
import { FC } from "react";
import DemoPost from "../../../components/DemoPost";
import { readPost, demoPaths, demoPostData, PostData } from "../../../lib/posts";


export const getStaticProps: GetStaticProps = async context => demoPostData(context, 'portfolio')

export const getStaticPaths = () => {
    return {
        paths: demoPaths('portfolio'),
        fallback: false,
    }
}

interface PortfolioDemoProps {
    postData?: PostData
}

const PortfolioDemo: FC<PortfolioDemoProps> = ({ postData }) => <DemoPost id={postData?.id || ''} title={postData?.title || ''} subDir="portfolio" />

export default PortfolioDemo