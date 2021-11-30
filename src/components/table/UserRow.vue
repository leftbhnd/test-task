<template>
  <tr>
    <td class="trow__checkbox" @click="select" :style="editUserStyle">
      <IconWrapper class="checkbox" :src="checkboxState" />
    </td>
    <TDUserWrapper
      class="trow__name"
      :value="user.name"
      :userInfo="userInfo"
      :inputInfo="info.nameInfo"
      @inputValue="userName"
    />
    <TDUserWrapper
      class="trow__phone"
      :value="user.phone"
      :userInfo="userInfo"
      :inputInfo="info.phoneInfo"
      @inputValue="userPhone"
    />
    <TDUserWrapper
      class="trow__email"
      :value="user.email"
      :userInfo="userInfo"
      :inputInfo="info.emailInfo"
      @inputValue="userEmail"
    />
    <TDUserWrapper
      class="trow__registration"
      :value="user.registration"
      :userInfo="userInfo"
      :inputInfo="info.registrationInfo"
      @inputValue="userRegistration"
    />
    <TDUserWrapper
      class="trow__code"
      :value="user.code"
      :userInfo="userInfo"
      :inputInfo="info.codeInfo"
      @inputValue="userCode"
    />
    <TDUserWrapper
      class="trow__city"
      :value="user.city"
      :userInfo="userInfo"
      :inputInfo="info.cityInfo"
      @inputValue="userCity"
    />
  </tr>
</template>

<script lang="ts">
import { mapGetters, mapActions } from 'vuex'
import IconWrapper from '@/components/wrappers/IconWrapper.vue'
import TDUserWrapper from '@/components/wrappers/TDUserWrapper.vue'
import { IUser, IInputInfo } from '@/store/types'
import { Validator } from '@/helpers/validator'
import { inputsInfo } from '@/helpers/inputsInfo'

const validator = new Validator()

export default {
  name: 'UserRow',
  components: {
    IconWrapper,
    TDUserWrapper
  },
  props: {
    user: Object
  },
  data (): { userData: IUser; info: IInputInfo } {
    return {
      userData: {
        name: this.user.name,
        phone: this.user.phone,
        email: this.user.email,
        registration: this.user.registration,
        code: this.user.code,
        city: this.user.city,
        id: this.user.id,
        selected: this.user.selected,
        valid: this.user.valid
      },
      info: inputsInfo
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
      return this.getNewUserState || this.getEditEvent
    },
    checkboxState (): string {
      return this.selectCondition
        ? require('@/assets/svg/checked.svg')
        : require('@/assets/svg/unchecked.svg')
    },
    editUserStyle (): string {
      return this.editCondition
        ? 'pointer-events: none;'
        : 'pointer-events: auto;'
    },
    userInfo (): {
      isSelected: boolean
      isValid: boolean
      id: number
      isEdit: boolean
      } {
      return {
        isSelected: this.user.selected,
        isValid: this.user.valid,
        id: this.user.id,
        isEdit: this.editCondition
      }
    },
    isAllValid (): boolean {
      return validator.isAllValid(
        this.userData.name,
        this.userData.phone,
        this.userData.email,
        this.userData.registration,
        this.userData.code,
        this.userData.city
      )
    }
  },
  methods: {
    ...mapActions([
      'selectUser',
      'selectAllUsers',
      'removeSelection',
      'updateUser',
      'saveEventObserver',
      'changeUserValidation'
    ]),
    select (): void {
      !this.selectCondition
        ? this.$store.dispatch('selectUser', this.user.id)
        : this.$store.dispatch('removeSelection', this.user.id)
    },
    userName (value: string): void {
      this.userData.name = value
    },
    userPhone (value: string): void {
      this.userData.phone = value
    },
    userEmail (value: string): void {
      this.userData.email = value
    },
    userRegistration (value: string): void {
      this.userData.registration = value
    },
    userCode (value: string): void {
      this.userData.code = value
    },
    userCity (value: string): void {
      this.userData.city = value
    }
  },
  watch: {
    getSaveEvent (): void {
      if (this.saveCondition) {
        this.$store.dispatch('updateUser', {
          name: this.userData.name,
          phone: this.userData.phone,
          email: this.userData.email,
          registration: this.userData.registration,
          code: this.userData.code,
          city: this.userData.city,
          id: this.user.id,
          selected: false,
          valid: this.user.valid
        })
        this.$nextTick(() => {
          this.$store.dispatch('editEventObserver', false)
        })
        this.$nextTick(() => {
          this.$store.dispatch('selectAllUsers', false)
        })
        this.$nextTick(() => {
          this.$store.dispatch('saveEventObserver', false)
        })
      }
    },
    isAllValid (): void {
      this.isAllValid
        ? this.$store.dispatch('changeUserValidation', {
          id: this.user.id,
          valid: true
        })
        : this.$store.dispatch('changeUserValidation', {
          id: this.user.id,
          valid: false
        })
    }
  }
}
</script>
