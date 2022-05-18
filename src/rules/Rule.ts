export class ValidationRule {
    field: string
    message: string

    constructor(field: string, message: string) {
        this.field = field
        this.message = message
    }

    checkValue(value: string): boolean {
        return false
    }
}