<template>
    <div class="container">
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Status</th>
            <th>Class</th>
            <th>Idade</th>
            <th>Armas</th>
            <th>Armaduras</th>
            <th>Atributo</th>
            <th>Ataque</th>
            <th>Exp</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(character, index) in options"
              :key="index"
              @click="redirectToItem(character._id)" >
            <td>{{ character.name }}</td>
            <td>{{ character.status }}</td>
            <td>{{ character.type }}</td>
            <td>{{ character.calculateAge() }}</td>
            <td>{{ character.weapons.length }}</td>
            <td>{{ character.armor.length }}</td>
            <td>{{ character.keyAttribute }}</td>
            <td>{{ character.calculateAttack()}}</td>
            <td>{{character.calculateXp() }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
 

  export default {
    name: 'CharacterTable',
    props: {
      options: {type: Array, default: () => []}
    },
    data() {
      return {
      }
    },
    methods: {
      redirectToItem(itemId) {
        this.$router.push(`/character/${itemId}`)
      },
    }
  }
  </script>

<style lang="sass" scoped>
@import '../../styles/mixins.sass'

div
  width: 100%

table
  @include table



</style>