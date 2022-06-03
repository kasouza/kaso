import { useCallback } from "react";
import Form from "../components/Form/Form";
import Layout from "../components/Layout";

export default function Contact() {
    return (
        <Layout title="Contact">
            <section className="flex flex-col gap-12 w-11/12 md:w-4/5 lg:w-3/5 mb-16">
                <div className="flex flex-col gap-4">
                    <h1 className="text-4xl">Contact</h1>
                    <p>If you want to talk to me, just fill in the field bellow and I&apos;ll respond as soon as possible!</p>
                </div>

                <Form action="/api/saske" inputs={[
                    { name: 'name', displayName: 'Name', placeholder: 'Rick Astley', type: 'text' },
                    { name: 'email', displayName: 'Email', placeholder: 'rick@email.com', type: 'email' },
                    { name: 'subject', displayName: 'Subject', placeholder: 'I will never give you up', type: 'text' },
                    {
                        name: 'message',
                        displayName: 'Message',
                        placeholder: 'Never gonna give you up\nNever gonna let you down\nNever gonna run around and desert you\nNever gonna make you cry\nNever gonna say goodbye\nNever gonna tell a lie and hurt you',
                        type: 'textarea'
                    },
                ]} />
            </section>
        </Layout>
    )
}