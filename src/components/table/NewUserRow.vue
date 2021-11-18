<template>
  <tr class="trow">
    <td class="trow__checkbox" :style="newUser">
      <IconWrapper class="checkbox" :src="checkbox" />
    </td>
    <td class="trow__name">
      <input class="edit-input row-input" type="text" v-model="name" />
    </td>
    <td class="trow__phone">
      <input class="edit-input row-input" type="text" v-model="phone" />
    </td>
    <td class="trow__email">
      <input class="edit-input row-input" type="text" v-model="email" />
    </td>
    <td class="trow__registration">
      <input
        class="edit-input row-input"
        type="text"
        v-model="registration"
      />
    </td>
    <td class="trow__code">
      <input class="edit-input row-input" type="text" v-model="code" />
    </td>
    <td class="trow__city">
      <input class="edit-input row-input" type="text" v-model="city" />
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
    },
    newUser (): string {
      return 'pointer-events: none;'
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
    }
  }
}
</script>
