<template>
    <footer class="footer">
      <div class="container">
        <span class="text-muted">Copyright © {{ currentYear }}</span><br>
        <span class="text-email">pablotellles@gmail.com</span>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'FooterComponent',
    data() {
      return {
        currentYear: new Date().getFullYear()
      }
    }
  }
  </script>
  
  <style lang="sass" scoped>
  @import '../styles/variables.sass'
  .footer 
    margin-top: 2rem
    padding: 2rem 0
    bottom: 0
    width: 100%
    height: 60px
    background-color: $color-background
    text-align: center
    display: flex
    align-items: center  
  .container 
    max-width: 960px
    margin: 0 auto  
  .text-muted 
    color: #999
  .text-email
    color: $color-yellow
  
  </style>
  