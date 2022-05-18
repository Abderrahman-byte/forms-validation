const { FormValidator, FieldRule, NumberRule } = require('../dist')

describe('Testing validation with rules', () => {
	const validator = new FormValidator()

	validator.addRules(
		new FieldRule(
			'username',
			/.{5,}/,
			'Username must contain more than 5 characteres.'
		),
		new FieldRule(
			'email',
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			'Invalid email value.'
		),
		new FieldRule(
			'password',
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
			'Password at least eight characters, one uppercase letter, one lowercase letter and one number.'
		),
		new NumberRule('age', 0),
		new NumberRule('magic', 10, 100)
	)

	test('Passing a normal use rules', () => {
		const errors = validator.validate({
			username: 'us',
			password: 'password',
			email: 'email',
			age: -1,
			magic: 111,
		})

		expect(errors).toEqual(
			expect.arrayContaining([
				{
					field: 'username',
					message: 'Username must contain more than 5 characteres.',
				},
				{ field: 'email', message: 'Invalid email value.' },
				{
					field: 'password',
					message:
						'Password at least eight characters, one uppercase letter, one lowercase letter and one number.',
				},
				{
					field: 'age',
					message: 'The age must be a number greater than 0.',
				},
				{
					field: 'magic',
					message: 'The magic must be a number between 10 and 100.',
				},
			])
		)
	})

	test('Passing a valid user and adding number to user', () => {
		const errors = validator.validate({
			username: 'username',
			password: 'password1293',
			email: 'email',
			age: -1,
			magic: 111,
		})

		expect(errors).toEqual(
			expect.arrayContaining([
				{ field: 'email', message: 'Invalid email value.' },
				{
					field: 'password',
					message:
						'Password at least eight characters, one uppercase letter, one lowercase letter and one number.',
				},
				{
					field: 'age',
					message: 'The age must be a number greater than 0.',
				},
				{
					field: 'magic',
					message: 'The magic must be a number between 10 and 100.',
				},
			])
		)
	})

    test('Passing adding uppercase to password and passing a valid user', () => {
		const errors = validator.validate({
			username: 'username',
			password: 'Password1293',
			email: 'myemail011@gmail.com',
			age: -1,
			magic: 111,
		})

		expect(errors).toEqual(
			expect.arrayContaining([
				{
					field: 'age',
					message: 'The age must be a number greater than 0.',
				},
				{
					field: 'magic',
					message: 'The magic must be a number between 10 and 100.',
				},
			])
		)
	})

    test('Passing age and magic within interval', () => {
		const errors = validator.validate({
			username: 'username',
			password: 'Password1293',
			email: 'myemail011@gmail.com',
			age: 10,
			magic: 99,
		})

		expect(errors.length).toBe(0)
	})
})
