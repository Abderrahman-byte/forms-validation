import { FieldRule } from "./FieldRule"

interface ValidationError {
    field: String
    message: String
}

const isNull = (value:any) => value === '' || value === null || value === undefined

export class FormValidator {
    allowedFields: string[]
    requiredFields: string[]
    rules: FieldRule[]

    constructor(rules?: FieldRule[], requiredFields?: string[], allowedFields?: string[]) {
        this.allowedFields = allowedFields || []
        this.requiredFields = requiredFields || []
        this.rules = rules || []
    }

    #checkAllowedFields(data: Record<string, any>): ValidationError[] {
        const errors: ValidationError[] = []

        Object.keys(data).forEach(field => {
            if (!this.allowedFields.includes(field) && !this.requiredFields.includes(field)) {
                errors.push({ field, message: `The field ${field} is not allowed.` })
            }
        })

        return errors
    }

    #checkRequiredFields(data: Record<string, any>): ValidationError[] {
        const errors: ValidationError[] = []
        const bodyFields = Object.keys(data)

        this.requiredFields.forEach(field => {
            if (!bodyFields.includes(field) || isNull(data[field])) {
                errors.push({ field, message: `The field ${field} is required.`})
            }
        })

        return errors
    }

    validate(data: Record<string, any>): ValidationError[] {
        const errors:ValidationError[] = [...this.#checkRequiredFields(data), ...this.#checkAllowedFields(data)]

        return errors
    }

    addRules(...rules: FieldRule[]): void {
        this.rules.push(...rules)
    }

    addRequiredFields(...allowedFields: string[]): void {
        this.requiredFields.push(...allowedFields)
    }

    addAllowedFields(...requiredFields: string[]): void {
        this.allowedFields.push(...requiredFields)
    }
}