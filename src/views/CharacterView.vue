<template>
  <div v-if="character" class="character">
    <div class="char-header">
      <div class="char-infos">
        <h2 class="char-name">{{ character.name + ', ' + character.calculateAge() }}</h2>
        <p class="char-nickname" >{{ `@${character.nickname}` }}</p>
        <p class="char-status" >{{ capitalize(character.status) }}</p>
        <CharacterBattleDetails :character="character" />
      </div>
      <div class="char-description">
        <img src="../assets/icons/charIcon.png" alt="">
        <p>{{ character.description }}</p>
      </div>
      <div>
        <button class="btn-edit" @click="showModal = true">Editar</button>
        <CustomModal :show="showModal"
                       title="Editar"
                       @closeModal="() => showModal = false" >
            <CreateCharacter :character="character"
                              @updateTable="getCharacter"
                              @closeModal="() => showModal = false" />
      </CustomModal>   
      </div>
    </div>
    <div class="secundary-box">
      <CharacterAtributtes class="attributes"
                           :name="character.name"
                           :attributes="character.attributes"
                           :keyAttribute="character.keyAttribute" />
      <TabContainer v-if="character" :tabs="tabs" @tabEffects="setTabIndex">
         <CharacterWeaponsVue v-show="tabIndex === 0"
                              class="weapons"
                              :character="character"
                              @updateData="getCharacter" />
         <Characterarmor v-show="tabIndex === 1"
                         class="weapons"
                         :character="character"
                          @updateData="getCharacter" />
      </TabContainer>

    </div>    
  </div>
</template>

<script>
import { api } from '@/api/api'

// Classes
import Character from '../classes/Character'

// Utils
import { capitalizeFirstLetter } from '@/utils/comuns'

// Components
import CreateCharacter from '@/components/Character/CreateCharacter.vue'
import CustomModal from '@/components/CustomModal.vue'
import CharacterAtributtes from '@/components/Character/CharacterAtributtes.vue'
import CharacterWeaponsVue from '@/components/Character/CharacterWeapons.vue'
import Characterarmor from '@/components/Character/CharacterArmor.vue'
import TabContainer from '@/components/TabContainer.vue'
import CharacterBattleDetails from '@/components/Character/CharacterBattleDetails.vue'

export default {
  name: 'CharacterView',
  components: {
    CreateCharacter,
    CharacterWeaponsVue,
    Characterarmor,
    CharacterAtributtes,
    CustomModal,
    TabContainer,
    CharacterBattleDetails
  },
  data() {
    return {
      character: null,
      showModal: false,
      tabIndex: 0,
      tabs: ['Armas', 'Armaduras'],
    }
  },
  created() {
    this.getCharacter()
  },
  methods: {
      capitalize (value) {
        return capitalizeFirstLetter(value)
      },
      getCharacter() {
        console.log('oi')
        const id = this.$route.params.id
        if (id) {
          api.get(`/knigthts/${id}`).then(response => {
          const CharacterClass = new Character(response.data)
          this.character = CharacterClass
          })
        }
      },
      setTabIndex (index) {
        this.tabIndex = index
      }
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
      justify-content: flex-end
      align-items: center
      gap: 2rem
      button
        @include button-open-modal
        width: 150px
        height: 50px

      justify-content: flex-start
      .char-infos
        min-width: 25%
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
        width: 80%
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
      padding: 1rem 0
      .weapons
        flex-grow: 1       

</style>
