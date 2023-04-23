<template>
    <div class="armos" v-if="character">
      <h2>Armaduras</h2>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Defesa</th>
              <th>Tipo</th>
              <th>Descrição</th>
              <th>Equip</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="armo in character.armor" :key="armo.id">
              <td :class="armo.equipped === true ? 'armo-equipped' : ''"
                  @click="handleEquip(armo)" >
                {{ armo.name }}
              </td>
              <td :class="armo.equipped === true ? 'armo-equipped' : ''"
                  @click="handleEquip(armo)">
                {{ armo.defense }}
              </td>
              <td :class="armo.equipped === true ? 'armo-equipped' : ''"
                  @click="handleEquip(armo)">
                {{ armo.type }}
              </td>
              <td :class="armo.equipped === true ? 'armo-equipped' : ''"
                  @click="handleEquip(armo)">
                {{ armo.description }}
              </td>
              <td :class="armo.equipped === true ? 'armo-equipped btn-collumn' : 'btn-collumn'" >
                  <button v-if="!armo.equipped" 
                          class="btn-equip"
                          @click="handleEquip(armo)">Equipar</button>
                  <img v-if="armo.equipped"
                           src="../../assets/icons/iconArmor.png" alt="icone de arama equipada">            
              </td>
            </tr>
          </tbody>
        </table>
    </div>
  </template>
  
  <script>
  // import { api } from '../../api/api'
  export default {
    name:'CharacterArmo',
    props: {
      character: {
        type: Object,
        requerid: true
      },
    },
    methods: {
      toggleEquip(armo) {
        armo.equipped = !armo.equipped
      },
      async handleEquip(armo) {
        await armo.equipArmor()        
        this.$emit('updateData')
      },
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
  width: 100%
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
    .armo-equipped
      color: $color-button
      font-size: 24px
    .btn-equip
      @include button-open-equip

    img
      width: 50px
</style>
  