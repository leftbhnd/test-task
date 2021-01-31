<template>
  <div>
    Тестовое здание
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item) in getData" :key="item.id">
          <td><input v-model="item.name" :disabled="item.isDisable"/></td>
          <td><input v-model="item.age" :disabled="item.isDisable"/></td>
          <td><input v-model="item.address" :disabled="item.isDisable"/></td>
          <td><button v-show="item.isDisable" @click="change(item.id)">Change</button></td>
          <td><button v-show="!item.isDisable" @click="save(item.id)">Save</button></td>
          <td><button>Delete</button></td>
        </tr>
        <tr>
          <td><input v-model="newItemName" type="text"></td>
          <td><input v-model="newItemAge" type="text"></td>
          <td><input v-model="newItemAddress" type="text"></td>
          <td><button @click="add">Add Item</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'TableComponent',
  data () {
    return {
      newItemName: '',
      newItemAge: '',
      newItemAddress: ''
    }
  },
  computed: {
    ...mapGetters(['getData'])
  },
  methods: {
    ...mapActions(['changeItem', 'saveItem', 'addItem']),
    change: function (id) {
      this.$store.dispatch('changeItem', id)
    },
    save: function (id) {
      this.$store.dispatch('saveItem', id)
    },
    add: function () {
      this.$store.dispatch('addItem', {
        name: this.newItemName,
        age: this.newItemAge,
        address: this.newItemAddress,
        isDisable: true,
        id: this.getData.length + 1
      })
      this.newItemName = ''
      this.newItemAge = ''
      this.newItemAddress = ''
    }
  }
}
</script>

<style scoped lang="scss">
</style>
