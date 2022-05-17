# Forms Validation

A simple library for validating data.

## Usage

```javascript
const formValidator = new FormValidator()

formValidator.addAllowedFields('username', 'password', 'email')
formValidator.addRequiredFields('age')

const errors = formValidator.validate(data) // returns array of errors if any

```