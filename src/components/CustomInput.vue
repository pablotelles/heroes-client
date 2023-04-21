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
    <span v-if="errorState">Campo incorreto ou vazio - mínimo 3 caracteres</span>
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
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      value: null,
      errorMsg: null,
      errorState: null,
    }
  },
  watch: {
    InitialValue () {
      this.value = this.InitialValue
    },
    value () {
      this.errorState = null
    }
  },
  created () {
    this.value = this.InitialValue
  },
  methods: {
    setValue (ev) {
      this.value = ev.target.value
    },
    onInput() {
      if (this.require) {
        const validate = validateInput.required.validate(this.value)
        if (validate) {
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
