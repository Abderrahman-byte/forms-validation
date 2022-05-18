import { ValidationRule } from "./Rule";

export class NumberRule extends ValidationRule {
    min?:number
    max?:number

    constructor (field: string, min?:number, max?:number) {
        super(field, '')

        if (min != undefined && max != undefined && min != null && max != null) {
            this.min = min < max ? min : max
            this.max = min < max ? max : min
        } else {
            this.max = max
            this.min = min
        }

        let message = `The ${field} must be a number`

        if (this.min != undefined && this.max != undefined && this.min != null && this.max != null) message += ` between ${min} and ${max}.`
        else if (this.min != undefined && this.min != null) message += ` greater than ${min}.`
        else if (this.max != undefined && this.max != null) message += ` less than ${max}.`
        else message += '.'

        this.message = message
    }

    checkValue(value: string): boolean {
        const n = Number(value)

        if (isNaN(n)) return false

        if ((this.max !== undefined && this.max !== null && this.max < n) || (this.min !== undefined && this.min !== undefined && this.min > n)) return false

        return true
    }
}