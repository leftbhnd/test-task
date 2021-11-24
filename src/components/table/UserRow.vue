<template>
  <tr>
    <td class="trow__checkbox" @click="select" :style="editUserStyle">
      <IconWrapper class="checkbox" :src="checkboxState" />
    </td>
    <td class="trow__name">
      <input
        v-if="editCondition"
        class="table-input"
        type="text"
        v-model="name"
        :style="nameValid"
      />
      <span v-else>{{ user.name }}</span>
    </td>
    <td class="trow__phone">
      <input
        v-if="editCondition"
        class="table-input"
        type="text"
        v-model="phone"
        :style="phoneValid"
      />
      <span v-else>{{ user.phone }}</span>
    </td>
    <td class="trow__email">
      <input
        v-if="editCondition"
        class="table-input"
        type="text"
        v-model="email"
        :style="emailValid"
      />
      <span v-else>{{ user.email }}</span>
    </td>
    <td class="trow__registration">
      <input
        v-if="editCondition"
        class="table-input"
        type="text"
        v-model="registration"
        :style="registrationValid"
      />
      <span v-else>{{ user.registration }}</span>
    </td>
    <td class="trow__code">
      <input
        v-if="editCondition"
        class="table-input"
        type="text"
        v-model="code"
        :style="codeValid"
      />
      <span v-else>{{ user.code }}</span>
    </td>
    <td class="trow__city">
      <input
        v-if="editCondition"
        class="table-input"
        type="text"
        v-model="city"
        :style="cityValid"
      />
      <span v-else>{{ user.city }}</span>
    </td>
  </tr>
</template>

<script lang="ts">
import { mapGetters, mapActions } from 'vuex'
import IconWrapper from '@/components/wrappers/IconWrapper.vue'
import { IUser } from '@/store/types'
import { Validator } from '@/helpers/validator'

export default {
  name: 'UserRow',
  components: {
    IconWrapper
  },
  props: {
    user: Object
  },
  data () {
    return {
      name: this.user.name,
      phone: this.user.phone,
      email: this.user.email,
      registration: this.user.registration,
      code: this.user.code,
      city: this.user.city,
      id: this.user.id,
      selected: this.user.selected,
      isValid: false
    }
  },
  computed: {
    ...mapGetters(['getNewUserState', 'getEditEvent', 'getSaveEvent']),
    selectCondition (): boolean {
      return this.user.selected
    },
    saveCondition (): boolean {
      return this.getSaveEvent && this.selectCondition
    },
    editCondition (): boolean {
      return this.getEditEvent && this.selectCondition
    },
    checkboxState (): string {
      if (this.selectCondition) {
        return require('@/assets/svg/checked.svg')
      } else {
        return require('@/assets/svg/unchecked.svg')
      }
    },
    editUserStyle (): string {
      if (this.getNewUserState || this.getEditEvent) {
        return 'pointer-events: none;'
      } else {
        return 'pointer-events: auto;'
      }
    },
    nameValid (): string {
      const validator = new Validator()
      if (validator.isValid({ type: 'name', value: this.name })) {
        return 'border: 1px solid #4aa6ff;'
      } else {
        return 'border: 1px solid red;'
      }
    },
    phoneValid (): string {
      const validator = new Validator()
      if (validator.isValid({ type: 'phone', value: this.phone })) {
        return 'border: 1px solid #4aa6ff;'
      } else {
        return 'border: 1px solid red;'
      }
    },
    emailValid (): string {
      const validator = new Validator()
      if (validator.isValid({ type: 'email', value: this.email })) {
        return 'border: 1px solid #4aa6ff;'
      } else {
        return 'border: 1px solid red;'
      }
    },
    registrationValid (): string {
      const validator = new Validator()
      if (validator.isValid({ type: 'registration', value: this.registration })) {
        return 'border: 1px solid #4aa6ff;'
      } else {
        return 'border: 1px solid red;'
      }
    },
    codeValid (): string {
      const validator = new Validator()
      if (validator.isValid({ type: 'code', value: this.code })) {
        return 'border: 1px solid #4aa6ff;'
      } else {
        return 'border: 1px solid red;'
      }
    },
    cityValid (): string {
      const validator = new Validator()
      if (validator.isValid({ type: 'city', value: this.city })) {
        return 'border: 1px solid #4aa6ff;'
      } else {
        return 'border: 1px solid red;'
      }
    }
  },
  methods: {
    ...mapActions([
      'selectUser',
      'removeSelection',
      'updateUser',
      'saveEventObserver',
      'checkValidation'
    ]),
    select (): void {
      if (!this.selectCondition) {
        this.$store.dispatch('selectUser', this.user.id)
      } else {
        this.$store.dispatch('removeSelection', this.user.id)
      }
    }
  },
  watch: {
    getSaveEvent (): void {
      if (this.saveCondition) {
        this.$store.dispatch('updateUser', {
          name: this.name,
          phone: this.phone,
          email: this.email,
          registration: this.registration,
          code: this.code,
          city: this.city,
          id: this.user.id,
          selected: false
        })
        this.$nextTick(() => {
          this.$store.dispatch('editEventObserver', false)
        })
        this.$nextTick(() => {
          this.$store.dispatch('saveEventObserver', false)
        })
      }
    },
    getEditEvent (): void {
      if (!this.editCondition) {
        this.name = this.user.name
        this.phone = this.user.phone
        this.email = this.user.email
        this.registration = this.user.registration
        this.code = this.user.code
        this.city = this.user.city
      }
    }
  }
}
</script>
