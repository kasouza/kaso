import {notEmpty, maxCharacters, isEmail} from '../input'

// File for things needed in both front and back end
export const SENDER_NAME_LENGTH = 64
export const SENDER_EMAIL_LENGTH = 256
export const SUBJECT_LENGTH = 64
export const MESSAGE_LENGTH = 1024

export interface MessageInfo {
	name: string,
	email: string,
	subject: string,
	message: string,
}

export const messageValidators = {
	name: [notEmpty(), maxCharacters(SENDER_NAME_LENGTH)],
	email: [notEmpty(), maxCharacters(SENDER_EMAIL_LENGTH), isEmail()],
	subject: [notEmpty(), maxCharacters(SUBJECT_LENGTH)],
	message: [notEmpty(), maxCharacters(MESSAGE_LENGTH)],
}
