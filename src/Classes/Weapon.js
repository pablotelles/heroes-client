import { api } from "@/api/api"

export default class Weapon {
    constructor({ _id, name, mod, attr, equipped, characterId }) {
      this._id = _id
      this.name = name;
      this.mod = mod;
      this.attr = attr;
      this.equipped = equipped;
      this.characterId = characterId;
    }

    async equipWeapon() {
      try {
        const payload = {weaponId: this._id, charId: this.characterId}
        const { data } = await api.post('/weapons/equpped', payload)
        return data
      } catch(err) {
        console.log('equip error')
        return false
      }
    }
}