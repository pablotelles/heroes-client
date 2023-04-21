<template>
  <div class="character">
    <!-- <div class="character-image">
      <img :src="imageSrc" :alt="name" />
    </div> -->
    <div class="character-info">
      <h2 class="character-name">Atributos</h2>
      <ul class="attribute-list">
        <li v-for="(value, key) in attributes" :key="key">
          <span :class="key == keyAttribute ? 'attribute-key' : ''">{{ key }}:</span>
          <span :class="key == keyAttribute ? 'attribute-key attribute-value' : 'attribute-value'" >{{ value }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CharacterAtributtes',
  props: {
    name: {
      type: String,
      required: true,
    },
    attributes: {
      type: Object,
      required: true,
    },
    keyAttribute: {
      type: String,
      required: true
    }
  },
}
</script>

<style lang="sass" scoped>
@import '../../styles/variables'
.character
  max-width: 300px
  display: flex
  flex-direction: row
  align-items: center
  gap: 1rem
  border-radius: 5px
  box-shadow: $box-shadow

.character-info 
  display: flex
  flex-direction: column
  gap: 0.5rem
  font-size: 1.2rem
  padding: 1.5rem 1rem 1.5rem 1rem


.character-name 
  font-size: 24px
  font-weight: bold
  text-shadow: 1px 1px #000
  text-align: left
  color: aliceblue


.attribute-list 
  list-style: none
  margin: 0
  padding: 0
  border-top: 1px solid $table-border-color
  width: 100%


.attribute-list li 
  display: flex
  flex-direction: row
  align-items: center
  border-bottom: 1px solid $table-border-color
  padding: 0.5rem 0
  color: aliceblue


.attribute-name 
  font-size: 20px
  text-transform: capitalize
  color: aliceblue

.attribute-key
  color: $color-button
  font-size: 24px
.attribute-value 
  margin-left: 0.5rem
  text-align: right
  flex-grow: 1
  padding-left: 3rem

</style>
