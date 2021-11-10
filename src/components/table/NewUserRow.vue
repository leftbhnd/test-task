<template>
  <tr class="trow">
    <td class="trow__checkbox" :style="'pointer-events: none;'">
      <IconWrapper class="checkbox" :src="checkbox" />
    </td>
    <td class="trow__name">
      <input class="edit-input row-input" type="text" v-model="newName" />
    </td>
    <td class="trow__phone">
      <input class="edit-input row-input" type="text" v-model="newPhone" />
    </td>
    <td class="trow__email">
      <input class="edit-input row-input" type="text" v-model="newEmail" />
    </td>
    <td class="trow__registration">
      <input
        class="edit-input row-input"
        type="text"
        v-model="newRegistration"
      />
    </td>
    <td class="trow__code">
      <input class="edit-input row-input" type="text" v-model="newCode" />
    </td>
    <td class="trow__city">
      <input class="edit-input row-input" type="text" v-model="newCity" />
    </td>
  </tr>
</template>

<script lang="ts">
import { mapGetters, mapActions } from 'vuex'
import IconWrapper from '@/components/wrappers/IconWrapper.vue'

export default {
  name: 'NewUserRow',
  components: {
    IconWrapper
  },
  data () {
    return {
      newName: '',
      newPhone: '',
      newEmail: '',
      newRegistration: '',
      newCode: '',
      newCity: ''
    }
  },
  computed: {
    ...mapGetters(['getSaveEvent']),
    checkbox () {
      return require('@/assets/svg/unchecked.svg')
    }
  },
  methods: {
    ...mapActions(['saveEventObserver', 'newUserWatcher', 'addNewUser'])
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
        this.$nextTick(() => {
          this.$store.dispatch('saveEventObserver', false)
        })
      }
    },
    getNewUserState () {
      if (!this.getNewUserState) {
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
