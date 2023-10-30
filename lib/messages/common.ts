import { notEmpty, maxCharacters, isEmail, isPhoneNumber, optional } from '../input'
import { addDoc, collection, getFirestore } from "firebase/firestore"

export const SENDER_NAME_LENGTH = 512
export const SENDER_EMAIL_LENGTH = 512
export const SENDER_PHONE_NUMBER_LENGTH = 512
export const SUBJECT_LENGTH = 512
export const MESSAGE_LENGTH = 2048

export interface MessageInfo {
    name: string,
    email: string,
    phoneNumber: string,
    subject: string,
    message: string,
}

export const messageValidators = {
    name: [notEmpty(), maxCharacters(SENDER_NAME_LENGTH)],
    email: [optional(), maxCharacters(SENDER_EMAIL_LENGTH), isEmail()],
    phoneNumber: [optional(), maxCharacters(SENDER_PHONE_NUMBER_LENGTH), isPhoneNumber()],
    subject: [notEmpty(), maxCharacters(SUBJECT_LENGTH)],
    message: [notEmpty(), maxCharacters(MESSAGE_LENGTH)],
}

export async function createMessage(name: string, subject: string, message: string, email?: string, phoneNumber?: string): Promise<boolean> {
    try {
        const firestore = getFirestore();
        await addDoc(collection(firestore, 'messages'), {
            name,
            subject,
            message,
            email: email || '',
            phoneNumber: phoneNumber || '',
        });

        return true;

    } catch (e: any) {
        console.log(e);
        return false;
    }
}
