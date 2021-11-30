<template>
  <tr class="trow">
    <td class="trow__checkbox" :style="newUser">
      <IconWrapper class="checkbox" :src="checkbox" />
    </td>
    <IMask
      class="trow__name"
      :inputInfo="info.nameInfo"
      @inputValue="nameValue"
    />
    <IMask
      class="trow__phone"
      :inputInfo="info.phoneInfo"
      @inputValue="phoneValue"
    />
    <IMask
      class="trow__email"
      :inputInfo="info.emailInfo"
      @inputValue="emailValue"
    />

    <IMask
      class="trow__registration"
      :inputInfo="info.registrationInfo"
      @inputValue="registrationValue"
    />
    <IMask
      class="trow__code"
      :inputInfo="info.codeInfo"
      @inputValue="codeValue"
    />
    <IMask
      class="trow__city"
      :inputInfo="info.cityInfo"
      @inputValue="cityValue"
    />
  </tr>
</template>

<script lang="ts">
import { mapGetters, mapActions } from 'vuex'
import { IUser, IInputInfo } from '@/store/types'
import IconWrapper from '@/components/wrappers/IconWrapper.vue'
import IMask from '@/components/wrappers/IMask.vue'
import { Validator } from '@/helpers/validator'
import { inputsInfo } from '@/helpers/inputsInfo'

const validator = new Validator()

export default {
  name: 'NewUserRow',
  components: {
    IconWrapper,
    IMask
  },
  data (): {
    user: IUser
    info: IInputInfo
    } {
    return {
      user: {
        name: '',
        phone: '',
        email: '',
        registration: '',
        code: '',
        city: '',
        id: null,
        selected: false,
        valid: false
      },
      info: inputsInfo
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
        this.user.name,
        this.user.phone,
        this.user.email,
        this.user.registration,
        this.user.code,
        this.user.city
      )
    }
  },
  methods: {
    ...mapActions([
      'saveEventObserver',
      'newUserWatcher',
      'addNewUser',
      'newUserValidationObserver',
      'newUserObserver'
    ]),
    nameValue (value: string): void {
      this.user.name = value
    },
    phoneValue (value: string): void {
      this.user.phone = value
    },
    emailValue (value: string): void {
      this.user.email = value
    },
    registrationValue (value: string): void {
      this.user.registration = value
    },
    codeValue (value: string): void {
      this.user.code = value
    },
    cityValue (value: string): void {
      this.user.city = value
    }
  },
  watch: {
    getSaveEvent (): void {
      if (this.getSaveEvent) {
        this.$store.dispatch('addNewUser', {
          name: this.user.name,
          phone: this.user.phone,
          email: this.user.email,
          registration: this.user.registration,
          code: this.user.code,
          city: this.user.city,
          id: this.getUsers.length,
          selected: false,
          valid: true
        })
        this.$nextTick(() => {
          this.$store.dispatch('saveEventObserver', false)
        })
        this.$nextTick(() => {
          this.$store.dispatch('newUserObserver', false)
        })
        this.$nextTick(() => {
          this.$store.dispatch('newUserValidationObserver', false)
        })
      }
    },
    getNewUserState (): void {
      if (!this.getNewUserState) {
        this.user.name = ''
        this.user.phone = ''
        this.user.email = ''
        this.user.registration = ''
        this.user.code = ''
        this.user.city = ''
        this.id = null
        this.user.selected = false
        this.user.valid = false
      }
    },
    isAllValid (): void {
      this.isAllValid
        ? this.$store.dispatch('newUserValidationObserver', true)
        : this.$store.dispatch('newUserValidationObserver', false)
    }
  }
}
</script>
