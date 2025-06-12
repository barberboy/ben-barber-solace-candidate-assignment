/**
 * Return a formatted telephone number from a string or number
 */
export default function formatPhoneNumber(phoneNumber: any = '') {
    let value = phoneNumber != undefined
        ? String(phoneNumber).replace(/\D+/g, "")
        : ""

    switch (value.length) {
        case 7:
            return value.replace(/(\d{3})(\d{4})/, "$1-$2")
        case 10:
            return value.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")
        case 11:
            return value.replace(/(\d{1})(\d{3})(\d{3})(\d{4})/, "+$1 ($2) $3-$4")
        default:
            return value
    }
}
