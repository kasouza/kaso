import { notEmpty, maxCharacters, isEmail, optional, isValidPassword } from '../../input'

import { getAuth, createUserWithEmailAndPassword, User } from "firebase/auth";

export const EMAIL_LENGTH = 512
export const PASSWORD_LENGTH = 512

export interface MessageInfo {
    email: string,
    password: string,
}

export const adminLoginValidators = {
    email: [optional(), maxCharacters(EMAIL_LENGTH), isEmail()],
    password: [notEmpty(), maxCharacters(PASSWORD_LENGTH), isValidPassword()],
}

export async function registerAdmin(email: string, password: string): Promise<User | null> {
    try {
        const auth = getAuth()
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const uid = userCredential.user.uid

        return userCredential.user;
    } catch (e: any) {
        return null;
    }
}

export async function loginAdmin(email: string, password: string) {
    return true;
}
