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
            <td>{{ handleAge(character.birthday) }}</td>
            <td>{{ character.weapons.length }}</td>
            <td>{{ character.keyAttribute }}</td>
            <td>{{ handleAttack(character)}}</td>
            <td>{{ handleXp(handleAge(character.birthday)) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import { calculateAge, calculeteXpKnight, calculeteAttack } from '@/utils/calculates'

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
      handleAge (date) {
        return calculateAge(date)
      },
      handleXp (age) {
        return calculeteXpKnight(age)
      },
      handleAttack (knight) {
        const attack = calculeteAttack(knight)
        return attack
      },
      redirectToItem(itemId) {
        this.$router.push(`/character/${itemId}`)
      },
    }
  }
  </script>

<style lang="scss" scoped>
@import '../styles/mixins.sass';

  table {
    @include table;
  }
</style>