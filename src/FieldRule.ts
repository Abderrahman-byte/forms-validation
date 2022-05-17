export class FieldRule {
    field: string
    rule: RegExp
    message: string

    constructor(field: string, rule: RegExp, message: string) {
        this.field = field
        this.rule = rule
        this.message = message
    }

    checkValue(value: string): boolean {
        return this.rule.test(value)
    }
}