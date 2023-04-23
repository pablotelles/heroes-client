<template>
  <div class="tab-wrapper ">
    <div class="tab-buttons">
      <button v-for="(tab, index) in tabs"
              :key="index"
              :class="{ 'active': currentTab === index, 'inactive': currentTab !== index }"
              @click="clickFromTab(index)">{{ tab }}</button>
    </div>
    <div class="tab-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabComponent',
  props: {
    tabs: {type: Array, required: true
    },
  },
  data() {
    return {
      currentTab: 0
    }
  },
  computed: {
    currentTabComponent() {
      return this.tabs[this.currentTab].component
    },
    currentTabProps() {
      return this.tabs[this.currentTab]?.props
    },
  },
  methods: {
    clickFromTab (index) {
      this.currentTab = index
      this.$emit('tabEffects', index)
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../styles/variables'
.tab-wrapper
  height: 100%
  width: 100%
  display: flex
  flex-direction: column

.tab-buttons
  background-color: $color-background
  color: $color-text
  display: flex
  align-items: center
  justify-content: space-around
  max-width: 33%
.tab-buttons button
  border: none
  background-color: transparent
  color: $color-text
  font-weight: bold
  font-size: 20px
  margin: 0
  padding: 10px
  cursor: pointer
  width: 100%

.tab-buttons
  :hover
    color: black

.tab-buttons button.active
  color: $color-background
  background-color: $table-text-color

.tab-buttons button:not(.active):hover

  color: $color-text

.tab-content
  flex: 1
  width: 100%

</style>
