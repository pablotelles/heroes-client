<template>
    <div class="container">
      <label>{{ label }}</label>
      <select class="select"
              v-model="selected"
             :disabled="disabled"
             @change="handleChange">
        <option v-for="(option, index) in options" :value="option.value" :key="index" :selected="option.selected">
          {{ option.label }}
        </option>
      </select>
    </div>
</template>
  
<script>
  export default {
    name:'CustomSelect',
    props: {
      label: {
        type: String,
        required: true
      },
      options: {
        type: Array,
        required: true
      },
      value: {
        type: String,
        required: true
      },
      disabled: {
        type: Boolean, 
        default: false
      }
    },
    data() {
      return {
        selected: null,
      }
    },
    methods: {
      handleChange() {
        this.$emit('setFilter', this.selected);
      }
    }
  };
</script>

<style lang="sass" scoped>
  @import '../styles/mixins'
  .container
    display: flex
    justify-content: start
    align-items: center
    flex-direction: column
    gap: 10px
    label
     @include label-forms     
    .select 
      @include input-forms
      height: 40px
      width: 250px
</style>
