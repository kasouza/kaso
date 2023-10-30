import { NextApiHandler } from "next"
import { validator } from '../../lib/input'
import { messageValidators, MessageInfo } from '../../lib/messages/common'

// There is no .d.ts file and I'm too lazy to write one
import nodemailer from 'nodemailer'

const senderUser = process.env.SENDER_EMAIL_USER
const senderPass = process.env.SENDER_EMAIL_PASS

function validate(value: string, validators: validator[]) {
	for (const validator of validators) {
		if (!validator(value)) return false
	}

	return true
}

function validateAll(message: MessageInfo) {
	return (
		validate(message.name, messageValidators.name) &&
		validate(message.email, messageValidators.email) &&
		validate(message.subject, messageValidators.subject) &&
		validate(message.message, messageValidators.message)
	)
}

function parseRequestBody(body: any): MessageInfo {
	if ('name' in body &&
		'email' in body &&
		'subject' in body &&
		'message' in body) {

		return {
			name: body.name,
			email: body.email,
			subject: body.subject,
			message: body.message
		}
	}

	return {
		name: '',
		email: '',
		subject: '',
		message: '',
	}
}

const handler: NextApiHandler = async (req, res) => {
	if (!senderUser || !senderPass) {
		console.error('Invalid user/pass')
		res.status(500).end()
		return
	}

	// Validations
	const messageInfo = parseRequestBody(req.body)
	if (!validateAll(messageInfo)) {
		res.status(300).send('Invalid message')
	}

	const { name, email, subject, message } = messageInfo

	const transporter = nodemailer.createTransport({
		host: 'smtp-mail.outlook.com',
		port: 587,
		auth: {
			user: senderUser,
			pass: senderPass,
		},
	})

	try {
		const info = await transporter.sendMail({
			from: senderUser,
			to: senderUser,
			replyTo: email,
			subject: `AUTOMATIC EMAIL - ${subject} - ${name}`,
			text: `#Message received from user: "${name}"\n${message}`,
		})
		console.log(info)
		res.status(200).end()

	} catch (e: any) {
		console.error(e)
		res.status(500).end()
	}
}

export default handler
