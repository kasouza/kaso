import { validateEmail } from "./email";

export type InputType = 'text' | 'submit' | 'textarea' | 'email' | 'password';
export type validator = (val: string) => { ok: boolean, err: string }

export interface Input {
    name: string,
    displayName: string,
    placeholder: string,
    type: InputType,
    validations?: validator[]
}

// These internal functions are use to keep one unique syntax for all the validation functions
// ( doValidation() ) but without the extra cost of creating new function every time. The ones
// that do not just return a somethingInternal, use currying 
const notEmptyInternal = (val: string) => ({ ok: val !== '', err: 'cannot be empty' })
export const notEmpty = (): validator => notEmptyInternal

const isEmailInternal = (val: string) => ({ ok: validateEmail(val), err: 'must be a valid email address' })
export const isEmail = (): validator => isEmailInternal

export const maxCharacters = (i: number): validator => (val: string) => ({ ok: val.length < i, err: `must be less then ${i} characters long` })
