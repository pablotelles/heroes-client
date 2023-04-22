<template>
    <div class="container">
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Classe</th>
            <th>Idade</th>
            <th>Armas</th>
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
            <td>{{ character.calculateAge() }}</td>
            <td>{{ character.weapons.length }}</td>
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

<style lang="scss" scoped>
@import '../../styles/mixins.sass';

  table {
    @include table;
  }
</style>