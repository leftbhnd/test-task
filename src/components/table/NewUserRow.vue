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
import { IUser } from '@/store/types'
import IconWrapper from '@/components/wrappers/IconWrapper.vue'

export default {
  name: 'NewUserRow',
  components: {
    IconWrapper
  },
  data (): IUser {
    return {
      name: '',
      phone: '',
      email: '',
      registration: '',
      code: null,
      city: '',
      id: null
    }
  },
  computed: {
    ...mapGetters(['getSaveEvent', 'getUsers']),
    checkbox (): string {
      return require('@/assets/svg/unchecked.svg')
    }
  },
  methods: {
    ...mapActions(['saveEventObserver', 'newUserWatcher', 'addNewUser'])
  },
  watch: {
    getSaveEvent (): void {
      if (this.getSaveEvent) {
        this.$store.dispatch('addNewUser', {
          name: this.name,
          phone: this.phone,
          email: this.email,
          registration: this.registration,
          code: this.code,
          city: this.city,
          id: this.getUsers.length
        })
        this.$nextTick(() => {
          this.$store.dispatch('saveEventObserver', false)
        })
      }
    },
    getNewUserState (): void {
      if (!this.getNewUserState) {
        this.name = ''
        this.phone = ''
        this.email = ''
        this.registration = ''
        this.code = ''
        this.city = ''
        this.id = null
      }
    },
    newName (): void {
      this.$store.dispatch('newUserWatcher', {
        type: 'name',
        data: this.name
      })
    },
    newPhone (): void {
      this.$store.dispatch('newUserWatcher', {
        type: 'phone',
        data: this.phone
      })
    },
    newEmail (): void {
      this.$store.dispatch('newUserWatcher', {
        type: 'email',
        data: this.email
      })
    },
    newRegistration (): void {
      this.$store.dispatch('newUserWatcher', {
        type: 'registration',
        data: this.registration
      })
    },
    newCode (): void {
      this.$store.dispatch('newUserWatcher', {
        type: 'code',
        data: this.code
      })
    },
    newCity (): void {
      this.$store.dispatch('newUserWatcher', {
        type: 'city',
        data: this.city
      })
    }
  }
}
</script>
