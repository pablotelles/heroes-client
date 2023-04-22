import moment from "moment";
import { api } from "@/api/api";
import Weapon from './Weapon'

export default class Character {
    constructor({_id, name, nickname, birthday, weapons, attributes, keyAttribute, status}) {
        this._id = _id
        this.name = name;
        this.nickname = nickname;
        this.birthday = birthday;
        this.status = status;
        this.weapons = weapons.map((weapon) => new Weapon({
          _id: weapon._id, 
          name: weapon.name, 
          mod: weapon.mod, 
          attr: weapon.attr, 
          equipped: weapon.equipped,
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
  
    calculateAttack() {
        const modValues = [-2,-2,-2,-2,-2,-2,-2,-2,-1,-1,0,0,1,1,1,2,2,2,3,3];
        const equippedWeapon = this.weapons.length ? this.weapons.find(weapon => weapon.equipped) : 0;
        const keyAttr = this.attributes[this.keyAttribute]
        const modIndex = () => {
          if (keyAttr < 0) return 0
          if (keyAttr >= 20) return 19
          return keyAttr
        }
        const mod = modValues[modIndex()];
        if (!equippedWeapon)  return 10 + mod + 0;
        return 10 + mod + equippedWeapon.mod;
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
