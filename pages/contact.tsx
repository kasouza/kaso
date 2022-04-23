import Layout from "../components/Layout";

export default function Contact() {
    return (
        <Layout>
            <section className="flex flex-col gap-4 w-11/12 md:w-4/5 lg:w-3/5">
                <h1 className="text-4xl">Contact</h1>
                <p>If you want to talk to me for a freelance or just for a casual chat, hit me up on any of the bellow!</p>

                <ul className="mt-4 flex flex-col gap-2">
                    <li>
                        <a className="underline underline-offset-2 hover:font-medium" href="https://github.com/kasouza">Github</a>
                    </li>
                    <li>
                        <a className="underline underline-offset-2 hover:font-medium" href="https://www.linkedin.com/in/kau%C3%A3-de-souza-costa-martins-moura-5892261b9/">Linkedin</a>
                    </li>
                    <li>
                        <a className="underline underline-offset-2 hover:font-medium" href="mailto:kaua.scmm@gmail.com">kaua.scmm@gmail.com</a>
                    </li>
                </ul>
            </section>
        </Layout>
    )
}