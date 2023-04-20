<template>
  <div class="character">
    <h1>Onde os cavaleiros nascem</h1>
    <CreateCharracter :character="character" />
  </div>
</template>

<script>
import CreateCharracter from '@/components/CreateCharracter.vue';
import { api } from '@/api/api';

export default {
  name: 'CharacterView',
  components: {
    CreateCharracter
  },
  data() {
    return {
      character: null,
    }
  },
  methods: {

  },
  created() {
    const id = this.$route.params.id
      if (id) {
        api.get(`/knigthts/${id}`).then(response => {
        this.character = response.data
      })
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../styles/mixins.sass';
    .character {
      @include page 
    }
</style>