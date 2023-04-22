<template>
    <div class="weapons" v-if="character">
      <h2>Armas</h2>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Atributo</th>
              <th>Modificador</th>
              <th>Equip</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="weapon in character.weapons" :key="weapon.id">
              <td :class="weapon.equipped === true ? 'weapon-equipped' : ''"
                  @click="halndleEquipped(weapon)" >
                {{ weapon.name }}
              </td>
              <td :class="weapon.equipped === true ? 'weapon-equipped' : ''"
                  @click="halndleEquipped(weapon)">
                {{ weapon.attr }}
              </td>
              <td :class="weapon.equipped === true ? 'weapon-equipped' : ''"
                  @click="halndleEquipped(weapon)">
                {{ weapon.mod }}
              </td>
              <td :class="weapon.equipped === true ? 'weapon-equipped btn-collumn' : 'btn-collumn'" >
                  <button v-if="!weapon.equipped" 
                          class="btn-equip"
                          @click="halndleEquipped(weapon)">Equipar</button>
                  <img v-if="weapon.equipped"
                        class="equipped-icon"
                        src="../../assets/icons/equippedWeapon.png" alt="icone de arama equipada">            
              </td>
            </tr>
          </tbody>
        </table>
    </div>
  </template>
  
  <script>
  // import { api } from '../../api/api'
  export default {
    props: {
      character: {
        type: Object,
        requerid: true
      },
    },
    methods: {
      toggleEquip(weapon) {
        weapon.equipped = !weapon.equipped
      },
      async halndleEquipped(weapon) {
        await weapon.equipWeapon()        
        this.updateData()
      },
      updateData () {
        this.$emit('updateData')
      }
    },
  }
  </script>

<style lang="sass" scoped>
@import '../../styles/variables'
@import '../../styles/mixins'

div
  display: flex
  flex-direction: column
  gap: 1rem
  padding-top: 20px 
  h2
    font-size: 40px
    text-align: left

  table
    border-collapse: collapse
    width: 100%
    padding: 1rem
    background-color: $table-bg-color
    border: 1px solid $table-border-color
    box-shadow: 0 0 10px $table-border-color
    th
      font-size: 22px
      color: $color-button
    th, td
      text-align: left
      vertical-align: middle
      padding: 8px
      border-bottom: 1px solid $table-border-color

      &:first-child
        border-left: 1px solid $table-border-color

      &:last-child
        border-right: 1px solid $table-border-color

    thead
      color: $table-header-text-color
      font-weight: bol
    .btn-collumn
      text-align: center
      padding: 15px 0
    .weapon-equipped
      color: $color-button
      font-size: 24px
    .btn-equip
      @include button-open-equip

    img
      width: 35px
</style>
  