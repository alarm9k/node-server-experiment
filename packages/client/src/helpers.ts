export function randomString(length: number): string {
    let value = '';
    for(let i = 0; i < length; i++) {
       value += randomDigit();
    }
    return value;
}

function randomDigit(): string {
    return String(Math.round(Math.random() * 9));
}