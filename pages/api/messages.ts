import { NextApiHandler } from "next"
import { getAllMessages, createMessage, deleteMessages } from "../../lib/messages/messages"
import { Message } from "../../lib/messages/common"

export interface ReqBody {
    email: string,
    name: string,
    subject: string,
    message: string,
}

const handler: NextApiHandler = async (req, res) => {
    if (req.method === 'GET') {
        const messages = await getAllMessages()
        res.status(200).json(messages)
        console.log(process.env.ADMIN_USER)

    } else if (req.method === 'POST') {
        const reqBody = req.body as ReqBody
        createMessage(new Message(
            reqBody.name, reqBody.email, reqBody.subject, reqBody.message
        ))
        res.status(200).send('')

    } else if (req.method === 'DELETE') {
        const rowids = JSON.parse(req.body) as number[]
        deleteMessages(rowids)
        res.status(200).send('')
    } else {
        res.status(405).setHeader('Allow', 'GET, POST').send('')
    }
}

export default handler