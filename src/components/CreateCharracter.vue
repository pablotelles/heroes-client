<template>
  <section>
    <form>      
      <CustomInput  class="name" 
                    id="name" label="Nome" 
                    type="text"
                    :require="true"
                    :disabled="character ? true : false"
                    :InitialValue="form.name"
                    @setError="setError"
                    @setInput="setValue" />
      <CustomInput class="nickname"
                   id="nickname"
                   label="Nickname" 
                   type="text"
                   :require="true"
                   :InitialValue="form.nickname"
                   @setError="setError"
                   @setInput="setValue" />
      <CustomInput class="birthday"
                   id="birthday"
                   label="Nascimento"
                   type="date"
                   :require="true"
                   :disabled="character ? true : false"
                   :InitialValue="form.birthday"
                   @setError="setError"
                   @setInput="setValue" />
      <div class="others">
        <CustomSelect :label="'Selecione uma Arma inicial'"
                      :options="optionsWeapons"
                      v-model="selected"
                      :disabled="character ? true : false"
                      @setFilter="selectWeapon" />
        <CustomInput class="description"
                   id="description"
                   label="Descrição"
                   type="text"
                   :require="false"
                   :InitialValue="form.description"
                   @setError="setError"
                   @setInput="setValue" />
      </div>
    </form>
    <span v-show="msgError.state">{{ msgError.msg }}</span>
    <footer class="footer">
        <button class="create" v-if="!character" @click="storeChar()">Salvar</button>
        <button class="edit" v-if="character" @click="updateChar()">Editar</button>
        <button class="delete" v-if="character" @click="deleteChar()">Excluir</button>
    </footer> 
  </section>    
</template>
  
<script>
  import CustomInput from './CustomInput.vue';
  import { api } from '@/api/api';
  import moment from 'moment';
  import CustomSelect from './CustomSelect.vue';

  export default {
    name: 'CreateCharcterer',
    components: {
      CustomInput,
      CustomSelect
    },
    props: {
      character: {type: Object, default: null}
    },
    data () {
      return {
        form: {
          name: null,
          nickname: null,
          birthday: null,
          description: null,
          type: 'knight',
          weaponId: null
        },
        msgError: {
          state: false,
          msg: 'Preencha todos os campos obrigatórios antes de salvar'
        },
        optionsWeapons: [],
      }
    },
    watch: {
      character () {
        this.form.name = this.character.name
        this.form.nickname = this.character.nickname
        this.form.birthday = moment(this.character.birthday).format('YYYY-MM-DD')
        this.form.description = this.character.description
        this.form.type = this.character.type
      }
    },
    created () {
      api.get('/weapons')
        .then(res => {
        res.data.map(item => {
          const obj = {
            label: `${item.name} | Mod: ${item.mod} | Attr: ${item.attr}`,
            value: item._id,
            // value: {name: item.name, mod: item.nod, attr: item.attr, equipped: true, description: item.description}
          }
          this.optionsWeapons.push(obj)
        })
      })
    },
    methods: {
      setValue (type, value) {
        this.form[type] = value
      },
      setError (value) {
        this.erroArr = value
      },
      async storeChar () {
        const {name, nickname, birthday} = this.form
        if (!name || !nickname || !birthday) {
          this.msgError.state = true
          return setTimeout(() => {
            this.msgError.state = false
          }, "3000")
        }
        await api.post('/knigthts', this.form)
        this.$emit('updateTable')
      },
      async updateChar () {
        const {name, nickname, birthday} = this.form
        if (!name || !nickname || !birthday) {
          this.msgError.state = true
          return setTimeout(() => {
            this.msgError.state = false
          }, "3000")
        }
        if (this.character) await api.put(`/knigthts/${this.character._id}`, this.form)
      },
      async deleteChar () {
        if (this.character) await api.delete(`/knigthts/${this.character._id}`, this.form)
      },
      selectWeapon(selectedValue) {
        this.form.weaponId = selectedValue
      }
    }
  }
</script>

<style lang="scss" scoped>
@import '../styles/mixins.sass';
  form {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 20px;
    padding: 2rem 1rem;
    .name {
      width: 30%
    }
    .nickname {
      width: 20%
    }
    .birthday {
      width: 20%
    }
    .others {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .description {
      width: 70%
    }
  }

  }
  span {
    color: red;
    font-size: 18px;
  }
  .footer {
    display: flex;
    justify-content: end;
    gap: 20px;
    .create {
      @include button-open-create
    }
    .delete {
      @include button-delete
    }
    .edit {
      @include button-edit
    }
  }
</style>
  