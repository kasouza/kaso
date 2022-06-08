import { NextApiRequest, NextApiResponse } from "next"

export const authenticate = (req: NextApiRequest, res: NextApiResponse) => {
	if (process.env.ADMIN_USER && process.env.ADMIN_PASSWORD && req && res) {
		// Authentication for admin using Basic Authentication
		// TODO: Use a better authentication model/system/whatever,
		// for now it's ok as there's not much of sensitive data stored anyway,
		// but should totally do something better
		if (req.headers.authorization) {
			const auth = req.headers.authorization
			const buff = Buffer.from(auth.split(' ')[1], 'base64')
			const text = buff.toString('utf-8')
			const [user, password] = text.split(':')

			if (user === process.env.ADMIN_USER && password === process.env.ADMIN_PASSWORD) {
				return true
			}
		}
	}

	return false
}
