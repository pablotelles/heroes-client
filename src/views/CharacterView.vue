<template>
  <div v-if="character" class="character">
    <div class="char-header">
      <div>
        <h2 class="char-name">{{ character.name + ', ' + getAge(character.birthday) }}</h2>
        <p class="char-nickname" >{{ `@${character.nickname}` }}</p>
        <p class="char-status" >{{ capitalize(character.status) }}</p>  
      </div>
      <div class="char-description">
        <img src="../assets/icons/charIcon.png" alt="">
        <p>{{ character.description }}</p>
      </div>
      <button @click="showModal = true">Editar</button>
      <CustomModal :show="showModal"
                       title="Editar"
                       @closeModal="() => showModal = false" >
            <CreateCharracter :character="character"
                              @updateTable="getData()"
                              @closeModal="() => showModal = false" />
      </CustomModal>    
    </div>
    <div class="secundary-box"> 
      <CharacterAtributtes class="attributes"
                           :name="character.name"
                           :attributes="character.attributes"
                           :keyAttribute="character.keyAttribute" />
      <CharacterWeaponsVue class="weapons"
                           :character="character"
                           @updateData="getCharacter" />
    </div>    
  </div>
</template>

<script>
import { api } from '@/api/api'

// Utils
import { calculateAge } from '@/utils/calculates'
import { capitalizeFirstLetter } from '@/utils/comuns'

// Components
import CreateCharracter from '@/components/Character/CreateCharracter.vue'
import CustomModal from '@/components/CustomModal.vue'
import CharacterAtributtes from '@/components/Character/CharacterAtributtes.vue'
import CharacterWeaponsVue from '@/components/Character/CharacterWeapons.vue'

export default {
  name: 'CharacterView',
  components: {
    CreateCharracter,
    CharacterWeaponsVue,
    CharacterAtributtes,
    CustomModal
  },
  data() {
    return {
      character: null,
      showModal: false
    }
  },
  created() {
    this.getCharacter()
  },
  methods: {
      getAge (age) {
        return calculateAge(age)
      },
      capitalize (value) {
        return capitalizeFirstLetter(value)
      },
      getCharacter() {
        const id = this.$route.params.id
        if (id) {
          api.get(`/knigthts/${id}`).then(response => {
          this.character = response.data
          })
        }
      },
  },
}
</script>
<style lang="sass" scoped>
  @import '../styles/variables'
  @import '../styles/mixins'
  .character
    @include page    
    .char-header
      display: flex
      align-items: center
      justify-content: space-between
      gap: 2rem
      button
        @include button-open-modal
        flex-grow: 1
        width: 150px
        height: 50px

      justify-content: flex-start
      .char-personal-data
      .char-name
        font-size: 40px
        text-align: left
      
      .char-nickname
        font-size: 26px
        text-align: left
      .char-status
        font-size: 18px
        text-align: left
        color: $color-button 
      .char-description
        display: flex
        gap: 2rem
        align-items: center
        padding: 2rem 0
        text-align: left
        img
          width: 100px
    .secundary-box
      display: flex
      flex-direction: row
      gap: 2rem
      .weapons
        flex-grow: 1

      
    
      

</style>
