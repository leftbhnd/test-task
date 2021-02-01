<template>
  <div>
    Тестовое здание
    <div>
      <input v-model="findUser">
    </div>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user) in filtredUsers" :key="user.id">
          <td><input v-model="user.name" :disabled="user.isDisable"/></td>
          <td><input v-model="user.age" :disabled="user.isDisable"/></td>
          <td><input v-model="user.address" :disabled="user.isDisable"/></td>
          <td><button v-show="user.isDisable" @click="change(user.id)">Change</button></td>
          <td><button v-show="!user.isDisable" @click="save(user.id)">Save</button></td>
          <td><button @click="remove(user.id)">Delete</button></td>
        </tr>
        <tr>
          <td><input v-model="newUserName" type="text"></td>
          <td><input v-model="newUserAge" type="text"></td>
          <td><input v-model="newUserAddress" type="text"></td>
          <td><button @click="add">Add Item</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'app',
  data () {
    return {
      newUserName: '',
      newUserAge: '',
      newUserAddress: '',
      findUser: ''
    }
  },
  computed: {
    ...mapGetters(['getUsers']),
    filtredUsers: function () {
      if (this.findUser) {
        return this.getUsers.filter(el => {
          if (el.name.includes(this.findUser)) {
            return el.name.includes(this.findUser)
          }
          if (el.address.includes(this.findUser)) {
            return el.address.includes(this.findUser)
          }
        })
      } else return this.getUsers
    }
  },
  methods: {
    ...mapActions(['changeUser', 'saveUser', 'addUser', 'removeUser']),
    change: function (id) {
      this.$store.dispatch('changeUser', id)
    },
    save: function (id) {
      this.$store.dispatch('saveUser', id)
    },
    add: function () {
      this.$store.dispatch('addUser', {
        name: this.newUserName,
        age: this.newUserAge,
        address: this.newUserAddress
      })
      this.newUserName = ''
      this.newUserAge = ''
      this.newUserAddress = ''
    },
    remove: function (id) {
      this.$store.dispatch('removeUser', { id: id })
    }
  }
}
</script>

<style scoped lang="scss">
</style>
