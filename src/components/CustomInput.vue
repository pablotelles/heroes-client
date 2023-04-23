<template>
  <div class="container">
    <label :for="id">{{ label }}<span v-if="require"> *</span></label>
    <input :id="id"
           class="input"
           :type="type"
           :value="value"
           :disabled="disabled"
           @input="setValue($event)"
           @blur="onInput()" />
    <span v-if="errorState">{{ errorMsg }}</span>
  </div>
</template>

<script>
import validateInput from '../utils/validateInput'

export default {
  name: 'CustomInput',
  props: {
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: "text"
    },
    InitialValue: {

      default: ""
    },
    require: {
      type: Boolean,
      default: false
    },
    validateType: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      value: null,
      originalValue: null,
      errorMsg: 'Mínimo 3 caracteres',
      errorState: null,
    }
  },
  watch: {
    value () {
      this.errorState = null
      this.errorMsg = 'Mínimo 3 caracteres'
    }
  },
  created () {
    this.value = this.InitialValue
    this.originalValue = this.InitialValue
  },
  methods: {
    setValue (ev) {
      this.value = ev.target.value
    },
    async onInput() {
      if (this.value === this.originalValue) return this.$emit("setInput", this.id, this.value)
      if (this.require && !this.validateType) {
        const validate = validateInput.required.validate(this.value)
        if (validate) {
          this.$emit("setInput", this.id, null)
          return this.errorState = true
        }
      }
      if (this.validateType) {        
        const validate = await validateInput[this.validateType].validate(this.value)
        if (validate) {
          this.errorMsg = validateInput[this.validateType].customMsg
          this.$emit("setInput", this.id, null)
          return this.errorState = true
        }
      }
      this.errorState = null
      this.$emit("setInput", this.id, this.value);
    },
  }
};
</script>

<style lang="sass" scoped>
  @import '../styles/mixins'
  .container
    display: flex
    flex-direction: column
    gap: 0.5rem
    padding: 10px 0
    label
     @include label-forms     
    input 
      @include input-forms
    span
      @include error-forms
      

</style>
