import sqlite3 from 'sqlite3'
import { MESSAGE_LENGTH, SENDER_EMAIL_LENGTH, SENDER_NAME_LENGTH, SUBJECT_LENGTH, Message } from './common'

const sql = sqlite3.verbose()
const db = new sql.Database('messages.sqlite3')
// const db = new sql.Database(':memory:')

export function createMessage(message: Message) {
    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS messages (senderName VARCHAR(${SENDER_NAME_LENGTH}), senderEmail VARCHAR(${SENDER_EMAIL_LENGTH}), subject VARCHAR(${SUBJECT_LENGTH}), message VARCHAR(${MESSAGE_LENGTH}), date INTEGER)`)
        const stmt = db.prepare('INSERT INTO messages VALUES(?, ?, ?, ?, ?)')
        stmt.run([message.senderName, message.senderEmail, message.subject, message.message, message.date.getTime()])
        stmt.finalize()
    })
}

export function getAllMessages(): Promise<Message[]> {
    return new Promise((resolve, reject) => {
        db.all('SELECT rowid, * FROM messages', (err, rows) => {
            if (err) {
                reject(err)
                console.error(err)
            } else {
                resolve(rows.map(row => new Message(
                    row.senderName,
                    row.senderEmail,
                    row.subject,
                    row.message,
                    new Date(row.date),
                    row.rowid
                )))
            }
        })
    })
}

export function deleteMessages(rowids: number[]) {
    db.serialize(() => {
        const stmt = db.prepare('DELETE FROM messages WHERE rowid = (?)')
        rowids.forEach(rowid => {
            stmt.run(rowid)
        })

        stmt.finalize()
    })
}