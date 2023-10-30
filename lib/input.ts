import { validateEmail } from "./email";
import { validatePhoneNumber } from "./phoneNumber";

export type InputType = 'text' | 'submit' | 'textarea' | 'email' | 'password';
export type validator = (val: string) => { ok: boolean, err?: string, stop?: boolean }

export interface Input {
    name: string,
    displayName: string,
    placeholder: string,
    type: InputType,
    validations?: validator[],
    required?: boolean,
}

export function validate(value: string, validators?: validator[]): { ok: boolean, err?: string } {
    if (!validators) {
        return { ok: true };
    }

    for (const validator of validators) {
        const validated = validator(value);

        if (!validated.ok) {
            return validated;
        }

        if (validated.stop) {
            return validated;
        }
    }

    return { ok: true };

}

export function optional(): validator {
    return (val: string) => ({ ok: true, stop: val.trim() === ''});
}

export function notEmpty(): validator {
    return (val: string) => ({ ok: val !== '', err: 'cannot be empty' })
}

export function isEmail(): validator {
    return (val: string) => ({ ok: validateEmail(val), err: 'must be a valid email address' })
}

export function isPhoneNumber(): validator {
    return (val: string) => ({ ok: validatePhoneNumber(val), err: 'must be a valid phone number' })
}

export function maxCharacters(i: number): validator {
    return (val: string) => ({ ok: val.length < i, err: `must be less then ${i} characters long` })
}

export function isValidPassword(): validator {
    return (val: string) => ({ ok: val.length >= 8, err: `must be at least 8 characters long` })
}
