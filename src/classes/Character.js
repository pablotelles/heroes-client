import moment from "moment";
import { api } from "@/api/api";
import Weapon from './Weapon'
import Armor from './Armor'

export default class Character {
    constructor({_id, name, nickname, birthday, weapons, armor, attributes, keyAttribute, description, status, type}) {
        this._id = _id
        this.name = name
        this.nickname = nickname
        this.birthday = birthday
        this.description = description
        this.status = status
        this.type = type
        this.livePoins = this.calculateLivePoints()
        this.weapons = weapons.map((weapon) => new Weapon({
          _id: weapon._id, 
          name: weapon.name, 
          mod: weapon.mod, 
          attr: weapon.attr,
          description: weapon.description,
          equipped: weapon.equipped,
          characterId: this._id
        }));
        this.armor = armor.map((armor) => new Armor({
          _id: armor._id, 
          name: armor.name, 
          defense: armor.defense, 
          description: armor.description, 
          equipped: armor.equipped,
          type: armor.type,
          characterId: this._id
        }));
        this.attributes = attributes;
        this.keyAttribute = keyAttribute;
    }
    calculateAge() {
        // Convert the input date to a Moment.js object
        const birthday = moment(this.birthday);
        // Calculate the difference between the birthday and the current date
        const ageInMilliseconds = moment().diff(birthday);
        // Convert the age to years
        const ageInYears = moment.duration(ageInMilliseconds).asYears();
        // Round the age to two decimal places
        const roundedAge = ageInYears.toFixed(0);
        // Return the age as a string
        return roundedAge;
    }
    
    calculateXp() {
        if (this.calculateAge() < 7) {
          return 0;
        } else {
          return Math.floor((this.calculateAge() - 7) * Math.pow(22, 1.45));
        }
    }

    calculateLivePoints() {
      const xp = this.calculateXp()
      const total = xp / 20
      return total.toFixed(0);
    }

    equippedWeapon () {
      const equippedWeapon = this.weapons.length ? this.weapons.find(weapon => weapon.equipped) : 0;
      if (equippedWeapon) return equippedWeapon
      return 0
    }

    calculateAttack() {
        const modValues = [-2,-2,-2,-2,-2,-2,-2,-2,-1,-1,0,0,1,1,1,2,2,2,3,3]
        const equippedWeapon = this.equippedWeapon().mod || 0
        const keyAttr = this.attributes[this.keyAttribute]
        const modIndex = () => {
          if (keyAttr < 0) return 0
          if (keyAttr >= 20) return 19
          return keyAttr
        }
        const mod = modValues[modIndex()]
        return 10 + mod + equippedWeapon
    }

    async equipWeapon(weapon) {
      try {
        const payload = {weaponId: weapon._id, charId: this._id}
        await api.post('/weapons/equpped', payload)
        return true
      } catch(err) {
        console.log('equip error')
        return false
      }
    }

    armorDefense () {
      const equippedArmor = this.armor.length ? this.armor.find(armor => armor.equipped) : 0;
      if (equippedArmor) return equippedArmor.defense
      return 0
    }

    takeDamage(attackValue) {
        const damageValue = attackValue - this.armorDefense();
        if (damageValue > 0) {
          this.livePoins -= damageValue
          console.log(`O inimigo ${this.name} perdeu ${damageValue} pontos de vida!`)
        } else {
          console.log(`O inimigo ${this.name} defendeu o ataque!`)
        }
    }
    battle(enemy) {
      const myAttack = this.calculateAttack()
      const enemyAttack = enemy.calculateAttack()

      while (this.livePoins > 0 && enemy.livePoins > 0) {
        // O personagem atual ataca o inimigo e subtrai os pontos de vida do inimigo
        enemy.takeDamage(enemyAttack)
        console.log(`${this.name} atacou ${enemy.name} com um ataque de ${myAttack} pontos. ${enemy.name} agora tem ${enemy.livePoins} pontos de vida.`);
    
        // Se o inimigo ainda estiver vivo, ele contra-ataca o personagem atual
        if (enemy.livePoins > 0) {
          this.livePoins -= enemyAttack;
          console.log(`${enemy.name} contra-atacou ${this.name} com um ataque de ${enemyAttack} pontos. ${this.name} agora tem ${this.livePoins} pontos de vida.`);
        }
      }
    
      // Se o personagem atual estiver morto, ele perdeu a batalha
      if (this.livePoins <= 0) {
        console.log(`${this.name} foi derrotado por ${enemy.name}.`);
      }
    
      // Se o inimigo estiver morto, o personagem atual venceu a batalha
      if (enemy.livePoins <= 0) {
        console.log(`${this.name} venceu a batalha contra ${enemy.name}.`);
      }
    } 
}
