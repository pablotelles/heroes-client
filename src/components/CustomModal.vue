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
    background-color: rgba(0, 0, 0, 0.5)
    display: flex
    justify-content: center
    align-items: center
    background-color: $color-background-modal

    &-content 
      background-color: white
      min-width: 70%
      min-height: 30%
      padding: 20px
      border-radius: 5px
      box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.3)
      background-color: $color-background-modal

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
