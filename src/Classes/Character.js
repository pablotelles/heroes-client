import moment from "moment";
import { api } from "@/api/api";
import Weapon from './Weapon'
import Armor from './Armor'

export default class Character {
    constructor({_id, name, nickname, birthday, weapons, armor, attributes, keyAttribute, description, status, type}) {
        this._id = _id
        this.name = name;
        this.nickname = nickname;
        this.birthday = birthday;
        this.description = description
        this.status = status;
        this.type = type;
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
    calculateAttack() {
        const modValues = [-2,-2,-2,-2,-2,-2,-2,-2,-1,-1,0,0,1,1,1,2,2,2,3,3];
        const equippedWeapon = this.modWeapon();
        const keyAttr = this.attributes[this.keyAttribute]
        const modIndex = () => {
          if (keyAttr < 0) return 0
          if (keyAttr >= 20) return 19
          return keyAttr
        }
        const mod = modValues[modIndex()];
        return 10 + mod + equippedWeapon;
    }
    modWeapon () {
      const equippedWeapon = this.weapons.length ? this.weapons.find(weapon => weapon.equipped) : 0;
      if (equippedWeapon) return equippedWeapon.mod
      return 0
    }
    armorDefense () {
      const equippedArmor = this.armor.length ? this.armor.find(armor => armor.equipped) : 0;
      if (equippedArmor) return equippedArmor.defense
      return 0
    }
    takeDamage(attackValue) {
        const defenseValue = 10; // exemplo, a defesa do inimigo é fixa em 10
        const damageValue = attackValue - defenseValue;
        if (damageValue > 0) {
          this.hitPoints -= damageValue;
          console.log(`O inimigo ${this.name} perdeu ${damageValue} pontos de vida!`);
        } else {
          console.log(`O inimigo ${this.name} se esquivou do ataque!`);
        }
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
}
