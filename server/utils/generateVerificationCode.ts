export const generateVerificationCode = (length = 6) => {
    const char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let VerificationCode = ''
    for (let i = 0; i < length; i++) {
        VerificationCode += char.charAt(Math.floor(Math.random() * char.length))
    }

    return VerificationCode

}