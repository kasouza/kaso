import { GetStaticProps, InferGetStaticPropsType } from "next"
import Layout from "../../components/Layout"
import { readFile, staticPaths } from "../../lib/IO"

export const getStaticProps: GetStaticProps = async context => {
    const { id }: { id: string } = context.params as any
    const postData = await readFile('area51', id)

    return {
        props: {
            postData
        }
    }
}

export const getStaticPaths = () => {
    return {
        paths: staticPaths('area51'),
        fallback: false,
    }
}

const Area51Post: InferGetStaticPropsType<typeof getStaticProps> = ({ postData }: { postData: any }) => {
    return (
        <Layout>
            <section className="flex flex-col gap-4 w-3/5">
                <h1 className="text-4xl">{postData.title}</h1>
                <img src={`/images/posts/area51/${postData.id}/carousel_1.jpg`} alt="Saskes" />
                <div dangerouslySetInnerHTML={{__html: postData.contentHtml}}></div>
            </section>
        </Layout>
    )
}

export default Area51Post