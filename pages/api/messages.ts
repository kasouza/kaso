import { NextApiHandler } from "next"
import { getAllMessages, createMessage, deleteMessages } from "../../lib/messages/messages"
import { Message } from "../../lib/messages/common"
import { authenticate } from "../../lib/auth"

export interface ReqBody {
	email: string,
	name: string,
	subject: string,
	message: string,
}

const handler: NextApiHandler = async (req, res) => {
	if (req.method === 'POST') {
		const reqBody = req.body as ReqBody
		createMessage(new Message(
			reqBody.name, reqBody.email, reqBody.subject, reqBody.message
		))
		res.status(200).send('')

	} else {
		const isAdmin = authenticate(req)
		if (isAdmin) {
			if (req.method === 'GET') {
				const messages = await getAllMessages()
				res.status(200).json(messages)

			} else if (req.method === 'DELETE') {
				const rowids = JSON.parse(req.body) as number[]
				deleteMessages(rowids)
				res.status(200).send('')

			} else {
				res.status(405).setHeader('Allow', 'GET, POST, DELETE').send('')
			}
		} else {
			res.status(401)
			res.setHeader('WWW-Authenticate', 'Basic').send('')
		}
	}
}

export default handler
