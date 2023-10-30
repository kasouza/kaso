const regexp = /^[\s()+-]*([0-9][\s()+-]*){6,20}$/
export function validatePhoneNumber(val: string): boolean {
    return val.length > 0 && regexp.test(val);
}
