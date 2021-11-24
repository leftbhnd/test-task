<template>
  <tr class="trow">
    <td class="trow__checkbox" :style="newUser">
      <IconWrapper class="checkbox" :src="checkbox" />
    </td>
    <td class="trow__name">
      <input
        class="table-input"
        type="text"
        v-model="name"
        :style="nameStyle"
      />
    </td>
    <td class="trow__phone">
      <input
        class="table-input"
        type="text"
        v-model="phone"
        :style="phoneStyle"
      />
    </td>
    <td class="trow__email">
      <input
        class="table-input"
        type="text"
        v-model="email"
        :style="emailStyle"
      />
    </td>
    <td class="trow__registration">
      <input
        class="table-input"
        type="text"
        v-model="registration"
        :style="registrationStyle"
      />
    </td>
    <td class="trow__code">
      <input
        class="table-input"
        type="text"
        v-model="code"
        :style="codeStyle"
      />
    </td>
    <td class="trow__city">
      <input
        class="table-input"
        type="text"
        v-model="city"
        :style="cityStyle"
      />
    </td>
  </tr>
</template>

<script lang="ts">
import { mapGetters, mapActions } from 'vuex'
import { IUser } from '@/store/types'
import IconWrapper from '@/components/wrappers/IconWrapper.vue'
import { Validator } from '@/helpers/validator'

const validator = new Validator()

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
      code: '',
      city: '',
      id: null,
      selected: false,
      valid: false
    }
  },
  computed: {
    ...mapGetters(['getSaveEvent', 'getUsers', 'getNewUserState']),
    checkbox (): string {
      return require('@/assets/svg/unchecked.svg')
    },
    newUser (): string {
      return 'pointer-events: none;'
    },
    isAllValid (): boolean {
      return validator.isAllValid(
        this.name,
        this.phone,
        this.email,
        this.registration,
        this.code,
        this.city
      )
    },
    nameStyle (): string {
      if (validator.isValid({ type: 'name', value: this.name })) {
        return 'border: 1px solid #4aa6ff;'
      } else {
        return 'border: 1px solid red;'
      }
    },
    phoneStyle (): string {
      if (validator.isValid({ type: 'phone', value: this.phone })) {
        return 'border: 1px solid #4aa6ff;'
      } else {
        return 'border: 1px solid red;'
      }
    },
    emailStyle (): string {
      if (validator.isValid({ type: 'email', value: this.email })) {
        return 'border: 1px solid #4aa6ff;'
      } else {
        return 'border: 1px solid red;'
      }
    },
    registrationStyle (): string {
      if (validator.isValid({ type: 'registration', value: this.registration })) {
        return 'border: 1px solid #4aa6ff;'
      } else {
        return 'border: 1px solid red;'
      }
    },
    codeStyle (): string {
      if (validator.isValid({ type: 'code', value: this.code })) {
        return 'border: 1px solid #4aa6ff;'
      } else {
        return 'border: 1px solid red;'
      }
    },
    cityStyle (): string {
      if (validator.isValid({ type: 'city', value: this.city })) {
        return 'border: 1px solid #4aa6ff;'
      } else {
        return 'border: 1px solid red;'
      }
    }
  },
  methods: {
    ...mapActions(['saveEventObserver', 'newUserWatcher', 'addNewUser', 'newUserValidationObserver'])
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
          id: this.getUsers.length,
          selected: false,
          valid: true
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
        this.selected = false
        this.valid = false
      }
    },
    isAllValid (): void {
      if (this.isAllValid) {
        this.$store.dispatch('newUserValidationObserver', true)
      } else {
        this.$store.dispatch('newUserValidationObserver', false)
      }
    }
  }
}
</script>
