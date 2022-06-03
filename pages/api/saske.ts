import { NextApiHandler } from "next";
import { getAllMessages, Message, postMessage } from "../../lib/messages";

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

    } else {
        const reqBody = req.body as ReqBody
        postMessage(new Message(
            'SASKE',
            'ruimderpvp@gmial.com',
            'dkadsa',
            'dkasldasdlsakdçalsfkas',
        ))
        res.status(200).json({ name: 'saske' })
    }
}

export default handler;
