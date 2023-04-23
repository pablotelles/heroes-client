import { api } from "@/api/api"

export default class Armor {
    constructor({ _id, name, defense, description, equipped, type, characterId }) {
      this._id = _id
      this.name = name;
      this.defense = defense;
      this.description = description;
      this.type = type;
      this.equipped = equipped;
      this.characterId = characterId;
    }

    async equipArmor() {
      try {
        const payload = {armorId: this._id, charId: this.characterId}
        const { data } = await api.post('/armor/equpped', payload)
        return data
      } catch(err) {
        console.log('equip error')
        return false
      }
    }
}