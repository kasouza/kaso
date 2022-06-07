import Layout from "../components/Layout";

export default function Area51() {
    return (
        <Layout title="Area 51">
            <section className="flex flex-col w-full items-center gap-12">
                <div className="flex flex-col gap-4 w-11/12 md:w-4/5 lg:w-3/5 mx-auto">
                    <h1 className="font-light text-4xl">Area 51</h1>
                    <p>Hi, again! Here at the Area 51 we have some of the craziest experiments and little projects I developed. I really love graphics programming (and programming in general), so expect to find some cool things in here.</p>

                    <h2 className="font-light mx-auto my-4 text-2xl md:text-3xl italic md:mt-8">Coming Soon...</h2>
                    {/* <ProjectList subDirectory="area51" posts={posts} /> */}
                </div>
            </section>
        </Layout>
    )
}
