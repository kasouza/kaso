import { NextApiHandler } from "next"
// import { getAllMessages, createMessage, deleteMessages } from "../../lib/messages/messages"
import { authenticate } from "../../lib/auth"
import { Message } from "../../lib/messages/common"
import { createMessage, deleteMessages, getAllMessages } from "../../lib/messages/messages"
// import nodemailer from 'nodemailer'
// 
// const transport = nodemailer.createTransport({
	// service: 'gmail',
	// port: 587,
	// secure: false,
	// auth: {
		// user: process.env.EMAIL_USER,
		// pass: process.env.EMAIL_PASS,
	// }
// })

export interface ReqBody {
	email: string,
	name: string,
	subject: string,
	message: string,
}

const handler: NextApiHandler = async (req, res) => {
	if (req.method === 'POST') {
		const message = req.body as ReqBody
		createMessage(new Message(
			message.name, message.email, message.subject, message.message
		))
		// const emailOptions = {
			// from: process.env.EMAIL_USER,
			// to: process.env.EMAIL_USER,
			// subject: `MESSAGE: ${message.subject}`,
			// text: message.message,
		// }
// 
		// const info = await transport.sendMail(emailOptions)
		// console.log(info)
		res.status(200).send('')

	} else {
		const isAdmin = authenticate(req)
		if (isAdmin) {
			if (req.method === 'GET') {
				const messages = await getAllMessages()
				res.status(200).json(messages)
				// res.status(200).json({})

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
