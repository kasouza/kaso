import { useCallback, useState } from "react";
import Layout from "../components/Layout";
import { Message } from "../lib/messages/messages";

export default function Test() {
    const [messages, setMessages] = useState<Message[]>([])

    const handlePost = useCallback(() => {
        fetch('/api/messages', { method: 'post' }).then(async (ok) => {
            const res = await ok.json()
            console.log(res)
        })
    }, [])

    const handleGet = useCallback(() => {
        fetch('/api/messages').then(async (ok) => {
            const res = await ok.json()
            console.log(res)
            setMessages(res)
        })
    }, [])

    return (
        <Layout title="test">
            <button onClick={handlePost}>POST</button>
            <button onClick={handleGet}>GET</button>
            <ul>
                {messages.map((message, i) => (
                    <li key={i}>{message.subject}</li>
                ))}
            </ul>

        </Layout>
    )
}