// File for things needed in both front and back end
export const SENDER_NAME_LENGTH = 64
export const SENDER_EMAIL_LENGTH = 256
export const SUBJECT_LENGTH = 64
export const MESSAGE_LENGTH = 1024

export class Message {
    rowid?: number
    senderName: string
    senderEmail: string
    subject: string
    message: string
    date: Date

    constructor(senderName: string,
        senderEmail: string,
        subject: string,
        message: string,
        date: Date = new Date, rowid?: number) {
        this.senderName = senderName.slice(0, SENDER_NAME_LENGTH)
        this.senderEmail = senderEmail.slice(0, SENDER_EMAIL_LENGTH)
        this.subject = subject.slice(0, SUBJECT_LENGTH)
        this.message = message.slice(0, MESSAGE_LENGTH)
        this.date = date
        this.rowid = rowid
    }
}