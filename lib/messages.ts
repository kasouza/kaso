import sqlite3 from 'sqlite3'

const SENDER_NAME_LENGTH = 64
const SENDER_EMAIL_LENGTH = 256
const SUBJECT_LENGTH = 64
const MESSAGE_LENGTH = 1024

const sql = sqlite3.verbose()
// const db = new sql.Database(process.cwd() + '/messages.sqlite3')
const db = new sql.Database(':memory')

export class Message {
    senderName: string
    senderEmail: string
    subject: string
    message: string
    date: Date

    constructor(senderName: string,
        senderEmail: string,
        subject: string,
        message: string,
        date: Date = new Date) {
        this.senderName = senderName.slice(0, SENDER_NAME_LENGTH)
        this.senderEmail = senderEmail.slice(0, SENDER_EMAIL_LENGTH)
        this.subject = subject.slice(0, SUBJECT_LENGTH)
        this.message = message.slice(0, MESSAGE_LENGTH)
        this.date = date
    }
}

export function postMessage(message: Message) {
    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS messages (senderName VARCHAR(${SENDER_NAME_LENGTH}), senderEmail VARCHAR(${SENDER_EMAIL_LENGTH}), subject VARCHAR(${SUBJECT_LENGTH}), message VARCHAR(${MESSAGE_LENGTH}), date INTEGER)`)
        const stmt = db.prepare('INSERT INTO messages VALUES(?, ?, ?, ?, ?)')
        stmt.run([message.senderName, message.senderEmail, message.subject, message.message, message.date.getTime()])
        stmt.finalize()
    })
}

export function getAllMessages(): Promise<Message[]> {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM messages', (err, rows) => {
            if (err) {
                reject(err)
                console.error(err)
            } else {
                resolve(rows)
            }
        })
    })
}