import Layout from "../components/Layout";

export default function Contact() {
    return (
        <Layout>
            <section className="flex flex-col gap-4 w-11/12 md:w-4/5 lg:w-3/5">
                <h1 className="text-4xl">Contact</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias eos reiciendis nisi a saepe recusandae fugiat accusamus dolores sunt quos temporibus tempora ab libero, expedita eum ex magnam id enim asperiores voluptatibus. Labore, laudantium. Placeat sit quo nostrum optio et esse facere fugit quas asperiores, voluptatem recusandae libero aliquam. Cupiditate!</p>

                <ul className="flex flex-col gap-2">
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