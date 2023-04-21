const validateInput = {
    required: {
        regx: '', // It is possible to fixed a regex code to use in validate
        value (value) {
            // it is possible to change the data type before returning to the parent component
            return value
        },
        validate (value) {
            if (value && value.length >= 3) return false
            return true
        }
    }
}

export default validateInput