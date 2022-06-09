import mysql from "mysql2";
import { Message } from './common'

// const conn = mysql.createConnection(process.env.PLANETSCALE_PRISMA_DATABASE || '')
// const conn = mysql.createConnection(process.env.DATABASE_URL2 || '')
const conn = mysql.createPool({
	host: process.env.PLANETSCALE_DB_HOST,
	user: process.env.PLANETSCALE_DB_USER,
	database: process.env.PLANETSCALE_DB,
	password: process.env.PLANETSCALE_DB_PASSWORD,
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,
})

export function createMessage(message: Message) {
	conn.execute('INSERT INTO messages (senderName, senderEmail, subject, message, date) VALUES(?, ?, ?, ?, ?)', [message.senderName, message.senderEmail, message.subject, message.message, message.date], (err) => {
		console.error(err)
	})
}

export function getAllMessages(): Promise<Message[]> {
	return new Promise((resolve, reject) => {
		conn.query('SELECT * FROM messages', (err, rows) => {
			if (err) {
				reject(err)
				console.error(err)
			} else {
				if (Array.isArray(rows)) {
					resolve(rows.map((row: any) => new Message(
						row.senderName,
						row.senderEmail,
						row.subject,
						row.message,
						new Date(row.date),
						row.id
					)))
				}
			}
		})
	})
}

export function deleteMessages(rowids: number[]) {
	rowids.forEach(rowid => {
		conn.execute('DELETE FROM messages WHERE id = (?)', [rowid], (err) => {
			if (err) {
				console.error(err)
			}
		})
	})
}
