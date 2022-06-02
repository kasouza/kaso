import Layout from "../components/Layout";
import classNames from "classnames";
import Form from "../components/Form/Form";
import FormItem, { FormItemType } from "../components/Form/FormItem";

export default function Login() {
    return (
        <Layout title="Login">
            <section className="mb-16">
                <Form inputs={[
                    { name: "name", displayName: "Name", placeholder: "Rick Astley", type: "text" },
                    { name: "password", displayName: "Password", placeholder: "Rick Astley", type: "password" }
                ]} />
            </section>
        </Layout>
    )
}