import { api } from "@/api/api"

const validateInput = {
    required: {
        regx: '', // It's possible to fixed a regex code to use in validate
        value (value) { // it's possible to change the data type before returning to the parent component
            return value
        },
        customMsg: '', // set a custom error to return to user
        validate (value) { // do some validation
            if (value && value.length >= 3) return false
            return true
        }
    },
    nickname: {
      customMsg: 'Esse nickname já está sendo usado',
      async validate (nickname) {
        if (nickname.length <= 4) {
          this.customMsg = 'O nickname deve ter mais de 4 caracteres'
          return true
        }
        const response = await api.get(`/knigthts/`, {
          params: {
            nickname: nickname    
          }
        })
        if (response.data.data.length) {
          this.customMsg = 'Esse nickname já está sendo usado'
          return true
        }
        return false
      }
    }
}

export default validateInput