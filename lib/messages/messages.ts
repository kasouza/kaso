import { PSDB } from "planetscale-node";
import { Message } from './common'

const conn = new PSDB('main')

export function createMessage(message: Message) {
	conn.execute('INSERT INTO messages (senderName, senderEmail, subject, message, date) VALUES(?, ?, ?, ?, ?)', [message.senderName, message.senderEmail, message.subject, message.message, message.date])
}

export async function getAllMessages(): Promise<Message[]> {
	const [rows, info] = await conn.query('SELECT * FROM messages', {})
	console.log('cuceta', rows, info)
	return rows.map((row: any) => new Message(
		row.senderName,
		row.senderEmail,
		row.subject,
		row.message,
		new Date(row.date),
		row.id
	))
}

export function deleteMessages(rowids: number[]) {
	rowids.forEach(rowid => {
		conn.execute('DELETE FROM messages WHERE id = (?)', [rowid])
	})
}
