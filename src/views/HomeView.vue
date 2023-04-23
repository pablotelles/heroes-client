<template>
  <div class="home">
    <div class="container">
      <section>
          <button @click="showModal = true">Criar Cavaleiro</button>
          <CustomModal :show="showModal"
                       title="Crie seu Personagem"
                       @closeModal="() => showModal = false">
            <CreateCharacter @updateTable="getData()" @closeModal="closeModal" />
          </CustomModal>
      </section>
    </div>
    <CustomSelect :label="'Filtros'"
                  :options="optionsFilter" 
                  @setFilter="filteredKnights"
                  value="" />
    <CharacterTable :options="characterOptions"/>
  </div>
</template>

<script>
import { api } from '@/api/api';

// Class
import Character from '@/classes/Character'

//Components
import CharacterTable from '@/components/Character/CharacterTable.vue';
import CustomModal from '@/components/CustomModal'
import CreateCharacter from '@/components/Character/CreateCharacter.vue';
import CustomSelect from '@/components/CustomSelect.vue';


export default {
  name: 'HomeView',
  components: {
    CharacterTable,
    CustomModal,
    CreateCharacter,
    CustomSelect
  },
  data() {
    return {
      characterOptions: [],
      showModal: false,
      optionsFilter: [
          { label: 'All', value: 'all' },
          { label: 'Heroes', value: 'hero' },
          { label: 'Legends', value: 'legend' }
        ],
      filterSelected: 'all'
    }
  },
  created() {
    this.getData();
  },
  watch: {
    async filterSelected () {
      if (this.filterSelected === 'all') return this.getData()

      const response = await api.get('/knigthts', {
        params: {
          status: this.filterSelected,
    
        }
      })
      const CharactersClass = response.data.data.map((char) => new Character(char)) 
      this.characterOptions = CharactersClass;
    }
    },
  methods: {
    setValue(type, value) {
      this[type] = value
    },
    async getData() {
      const response = await api.get('/knigthts');
      if(!response) return
      const CharactersClass = response.data.map((char) => new Character(char)) 
      this.characterOptions = CharactersClass;
    },
    filteredKnights(selectedValue) {
      this.filterSelected = selectedValue
    },
    closeModal () {
      this.showModal = false
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixins.sass';
    .home {
      @include page
      }
      .container {
        width: 100%;
        display: flex;
        flex-direction: row;
        padding-bottom: 2rem;
        button {
            @include button-open-modal
        }
    }


    

</style>
