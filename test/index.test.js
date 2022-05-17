const { FormValidator } = require('../dist')

describe('Testing checking required and allowed fields', () => {
	test('Empty FormValidator must return no errors', () => {
		const formValidator = new FormValidator()
		const errors = formValidator.validate({})

		expect(errors.length).toBe(0)
	})

	test('Validation form must check allowed fields', () => {
		const formValidator = new FormValidator()

		formValidator.addAllowedFields('username', 'password', 'password2')

		const errors = formValidator.validate({
			username: 'username',
			password: 'password',
			age: 19,
		})

		expect(errors.length).toBe(1)
		expect(errors[0]).toEqual({
			field: 'age',
			message: 'The field age is not allowed.',
		})
	})

    test('Validation form must check required fields', () => {
		const formValidator = new FormValidator()

		formValidator.addRequiredFields('username', 'password', 'age')

		const errors = formValidator.validate({
			username: 'username',
			password: 'password'
		})

		expect(errors.length).toBe(1)
		expect(errors[0]).toEqual({
			field: 'age',
			message: 'The field age is required.',
		})
	})
})
