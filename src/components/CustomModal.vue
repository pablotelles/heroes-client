<template>
  <div>
    <div v-if="show" class="modal">
      <div class="modal-content">
        <img class="close-icon" src="../assets/icons/closeIcon.png" @click="close" alt="Icone para fechar o modal">
        <h2 class="title">{{ title }}</h2>
        <slot></slot>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  name: "CustomModal",
  props: {
    show: {type: Boolean, default: false},
    title: {type: String, default: ''}
  },
  methods: {
    close() {
      console.log('close')
      this.$emit('closeModal')
    }
  }
}
</script>

<style lang="sass" scoped>
  @import '../styles/mixins.sass'
  @import '../styles/variables'

  img 
    @include close-icon-modal
 

  .modal
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    display: flex
    justify-content: center
    align-items: center
    background-color: $color-background-modal

    &-content   
      width: 70%   
      border-radius: 5px
      box-shadow: $box-shadow
      padding: 1.5rem
      .title 
        display: block
        font-family: Arial
        text-align: left
        font-size: 40px
        font-weight: bold
        color: #333
        margin-bottom: 10px
        color: $color-text
</style>
