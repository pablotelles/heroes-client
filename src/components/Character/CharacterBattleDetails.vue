<template>
  <div class="container" v-if="character">
    <div class="life">
      <div class="life-items">
        <img class="life-icons" src="../../assets/icons/iconLifePoints.png" alt="icone de arma equipada">
        <span class="life-points">{{ character.calculateLivePoints() }} </span>
      </div>
      <div class="life-items">
        <span class="xp">{{ character.calculateXp() + 'xp' }}</span>
      </div>
    </div>
    <div class="equip">
      <div class="equip-item">
        <img src="../../assets/icons/iconSword.png" alt="icone de arma equipada">
        <span class="equip-item-value">+ {{ character.modWeapon() }}</span>
      </div>
      <div class="equip-item">
        <img src="../../assets/icons/iconArmor.png" alt="icone de armadura equipada">
        <span class="equip-item-value"> {{ character.armorDefense() }}</span>
      </div>
      <div class="equip-item">
        <img src="../../assets/icons/equippedWeapon.png" alt="icone de armadura equipada">
        <span class="equip-item-value">{{ character.calculateAttack() }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CharacterBattleDetails",
  props: {
    character: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="sass" scoped>
@import '../../styles/variables'
.container
  display: flex
  flex-wrap: wrap
  padding: 1rem 0
  gap: 10px
  img
    width: 30px
  .life
    display: flex
    width: 100%
    gap: 2rem
    .life-items
      display: flex
      align-items: center
      width: 50px
      .xp
        font-size: 30px
        color: $color-accent
        font-weight: bold
      .life-points
        font-size: 24px
        color: $color-test-sucess
  .equip
    width: 100%
    display: flex
    gap: 2rem
    font-weight: bold
    .equip-item
      display: flex
      gap: 10px
      .equip-item-value
        font-size: 24px

</style>
