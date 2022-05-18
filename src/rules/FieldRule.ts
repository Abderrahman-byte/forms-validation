import { ValidationRule } from "./Rule"

export class FieldRule extends ValidationRule {
    rule: RegExp

    constructor(field: string, rule: RegExp, message: string) {
        super(field, message)
        this.rule = rule
    }

    checkValue(value: string): boolean {
        return this.rule.test(value)
    }
}