import { NextApiHandler } from "next";

export interface ReqBody {
    email: string,
    name: string,
    subject: string,
    message: string,
}

const handler:NextApiHandler = (req, res) => {
    const reqBody = req.body as ReqBody
    res.status(200).json({ name: 'saske' })
}

export default handler;
