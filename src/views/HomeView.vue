<template>
  <div class="home">
    <div class="container">
      <section>
          <button @click="showModalCharacter = true">Criar Cavaleiro</button>
          <CustomModal :show="showModalCharacter"
                       title="Crie seu Heroi"
                       @closeModal="() => showModalCharacter = false">
            <CreateCharracter @updateTable="getData()" />
          </CustomModal>
      </section>
    </div>
    <CustomSelect :label="'Filtros'"
                  :options="optionsFilter" 
                  v-model="selected" 
                  @setFilter="filteredKnights" />
    <CharacterTable :options="characterOptions"/>
  </div>
</template>

<script>


//Components
import CharacterTable from '@/components/CharacterTable.vue';
import CustomModal from '@/components/CustomModal'
import CreateCharracter from '@/components/CreateCharracter.vue';
import CustomSelect from '@/components/CustomSelect.vue';

import { api } from '@/api/api';
export default {
  name: 'HomeView',
  components: {
    CharacterTable,
    CustomModal,
    CreateCharracter,
    CustomSelect
  },
  data() {
    return {
      characterOptions: [],
      showModalCharacter: false,
      showModalWeapon: false,
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
          status: this.filterSelected
        }
      })
      this.characterOptions = response.data;
    }
    },
  methods: {
    setValue(type, value) {
      this[type] = value
    },
    async getData() {
      const response = await api.get('/knigthts');
      this.characterOptions = response.data;
    },
    filteredKnights(selectedValue) {
      this.filterSelected = selectedValue
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../styles/mixins.sass';
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
