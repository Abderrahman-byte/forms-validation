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
			password: 'password',
		})

		expect(errors.length).toBe(1)
		expect(errors[0]).toEqual({
			field: 'age',
			message: 'The field age is required.',
		})
	})

	test('Validation form must required and allowed field', () => {
		const formValidator = new FormValidator()

		formValidator.addRequiredFields('username', 'password', 'email')
		formValidator.addAllowedFields('age')

		const errors = formValidator.validate({
			username: 'password',
			password: 'password',
			age: 16,
			password2: 'password',
		})

		expect(errors).toEqual(
			expect.arrayContaining([
				{ field: 'email', message: 'The field email is required.' },
				{ field: 'password2', message: 'The field password2 is not allowed.' },
			])
		)
	})
})
