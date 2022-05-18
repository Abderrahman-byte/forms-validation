# Forms Validation

A simple library for validating data.

## Usage

```javascript
const validator = new FormValidator()

validator.addRequiredFields('username', 'password', 'email')
validator.addAllowedFields('age')

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
	new NumberRule('magic', 10, 100) // The field magic will be added to allowed fields
)

const errors = formValidator.validate(data) // returns array of errors if any
```
