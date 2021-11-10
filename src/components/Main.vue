<template>
  <table class="table container">
    <thead class="table__header">
      <tr class="trow">
        <th class="trow__checkbox">
          <input type="checkbox" :disabled="getNewUserState" />
        </th>
        <th class="trow__name">
          <span class="trow__label">Пользователь</span>
        </th>
        <th class="trow__phone">
          <span class="trow__label">Номер телефона</span>
        </th>
        <th class="trow__email">
          <span class="trow__label">Email</span>
        </th>
        <th class="trow__registration">
          <span class="trow__label">Дата регитрации</span>
        </th>
        <th class="trow__code">
          <span class="trow__label">Код</span>
        </th>
        <th class="trow__city">
          <span class="trow__label">Город</span>
        </th>
      </tr>
    </thead>
    <tbody class="table__body">
      <tr v-if="getNewUserState" class="trow">
        <td class="trow__checkbox">
          <input type="checkbox" :disabled="getNewUserState" />
        </td>
        <td class="trow__name">
          <input class="trow__label edit-input" type="text" v-model="newName" />
        </td>
        <td class="trow__phone">
          <input
            class="trow__label edit-input"
            type="text"
            v-model="newPhone"
          />
        </td>
        <td class="trow__email">
          <input
            class="trow__label edit-input"
            type="text"
            v-model="newEmail"
          />
        </td>
        <td class="trow__registration">
          <input
            class="trow__label edit-input"
            type="text"
            v-model="newRegistration"
          />
        </td>
        <td class="trow__code">
          <input class="trow__label edit-input" type="text" v-model="newCode" />
        </td>
        <td class="trow__city">
          <input class="trow__label edit-input" type="text" v-model="newCity" />
        </td>
      </tr>
      <TableRowWrapper
        v-for="(user, index) in getUsers"
        :key="index"
        :user="user"
        class="trow"
      />
    </tbody>
  </table>
</template>

<script lang="ts">
import { mapActions, mapGetters } from 'vuex'
import TableRowWrapper from '@/components/wrappers/TableRowWrapper.vue'

export default {
  name: 'Main',
  components: {
    TableRowWrapper
  },
  data () {
    return {
      newName: '',
      newPhone: '',
      newEmail: '',
      newRegistration: '',
      newCode: '',
      newCity: '',
      checked: []
    }
  },
  computed: {
    ...mapGetters(['getUsers', 'getNewUserState', 'getSaveEvent'])
  },
  methods: {
    ...mapActions(['newUserWatcher', 'addNewUser', 'saveEventObserver'])
  },
  watch: {
    getSaveEvent () {
      if (this.getSaveEvent) {
        this.$store.dispatch('addNewUser', {
          name: this.newName,
          phone: this.newPhone,
          email: this.newEmail,
          registration: this.newRegistration,
          code: this.newCode,
          city: this.newCity
        })
        this.$store.dispatch('saveEventObserver', false)
      }
    },
    getNewUserState () {
      if (!this.getEditState) {
        this.newName = ''
        this.newPhone = ''
        this.newEmail = ''
        this.newRegistration = ''
        this.newCode = ''
        this.newCity = ''
      }
    },
    newName () {
      this.$store.dispatch('newUserWatcher', {
        type: 'name',
        data: this.newName
      })
    },
    newPhone () {
      this.$store.dispatch('newUserWatcher', {
        type: 'phone',
        data: this.newPhone
      })
    },
    newEmail () {
      this.$store.dispatch('newUserWatcher', {
        type: 'email',
        data: this.newEmail
      })
    },
    newRegistration () {
      this.$store.dispatch('newUserWatcher', {
        type: 'registration',
        data: this.newRegistration
      })
    },
    newCode () {
      this.$store.dispatch('newUserWatcher', {
        type: 'code',
        data: this.newCode
      })
    },
    newCity () {
      this.$store.dispatch('newUserWatcher', {
        type: 'city',
        data: this.newCity
      })
    }
  }
}
</script>

<style lang="scss">
.table {
  display: flex;
  flex-direction: column;

  width: 100%;

  background-color: #ffffff;
  &__header {
    background-color: #f0f2f480;
  }
}
.trow {
  display: flex;
  flex: 1 1 100%;
  &__checkbox {
    flex: 0 0 48px;
    justify-content: center;
  }
  &__checkbox input {
    max-width: 16px;
  }
  &__name {
    flex: 1 1 300px;

    padding: 3px;
  }
  &__phone {
    flex: 1 1 210px;

    padding: 3px;
  }
  &__email {
    flex: 1 1 350px;

    padding: 3px;
  }
  &__registration {
    flex: 1 1 220px;

    padding: 3px;
  }
  &__code {
    flex: 1 1 100px;

    padding: 3px;
  }
  &__city {
    flex: 1 1 212px;

    padding: 3px;
  }
  &__label {
    padding-left: 8px;

    color: #7b8395;

    font-family: IBM Plex Mono;
    font-size: 12px;
    font-weight: 500;
    font-style: normal;
    line-height: 16px;
  }
}
th,
td {
  display: flex;
  align-items: center;

  height: 48px;

  border: 1px solid #c6d1dd80;
}
.user-input,
.edit-input {
  box-sizing: border-box;
  width: 100%;
  height: 100%;

  background-color: #ffffff;
}
.edit-input {
  border: 1px solid #4aa6ff;
  border-radius: 4px;
}
</style>
