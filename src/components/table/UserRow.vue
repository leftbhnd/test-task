<template>
  <tr>
    <td class="trow__checkbox" @click="select" :style="editUserStyle">
      <IconWrapper class="checkbox" :src="checkboxState" />
    </td>
    <TDWrapper
      class="trow__name"
      :userData="user.name"
      :userInfo="userInfo"
      :type="'name'"
      @value="userName"
    />
    <TDWrapper
      class="trow__phone"
      :userData="user.phone"
      :userInfo="userInfo"
      :type="'phone'"
      @value="userPhone"
    />
    <TDWrapper
      class="trow__email"
      :userData="user.email"
      :userInfo="userInfo"
      :type="'email'"
      @value="userEmail"
    />
    <TDWrapper
      class="trow__registration"
      :userData="user.registration"
      :userInfo="userInfo"
      :type="'registration'"
      @value="userRegistration"
    />
    <TDWrapper
      class="trow__code"
      :userData="user.code"
      :userInfo="userInfo"
      :type="'code'"
      @value="userCode"
    />
    <TDWrapper
      class="trow__city"
      :userData="user.city"
      :userInfo="userInfo"
      :type="'city'"
      @value="userCity"
    />
  </tr>
</template>

<script lang="ts">
import { mapGetters, mapActions } from 'vuex'
import IconWrapper from '@/components/wrappers/IconWrapper.vue'
import TDWrapper from '@/components/wrappers/TDWrapper.vue'
import { IUser } from '@/store/types'
import { Validator } from '@/helpers/validator'

const validator = new Validator()

export default {
  name: 'UserRow',
  components: {
    IconWrapper,
    TDWrapper
  },
  props: {
    user: Object
  },
  data (): IUser {
    return {
      name: this.user.name,
      phone: this.user.phone,
      email: this.user.email,
      registration: this.user.registration,
      code: this.user.code,
      city: this.user.city,
      id: this.user.id,
      selected: this.user.selected,
      valid: this.user.valid
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
      if (this.selectCondition) {
        return require('@/assets/svg/checked.svg')
      } else {
        return require('@/assets/svg/unchecked.svg')
      }
    },
    editUserStyle (): string {
      if (this.editCondition) {
        return 'pointer-events: none;'
      } else {
        return 'pointer-events: auto;'
      }
    },
    userInfo (): { isSelected: boolean; isValid: boolean; id: number, isEdit: boolean } {
      return {
        isSelected: this.user.selected,
        isValid: this.user.valid,
        id: this.user.id,
        isEdit: this.editCondition
      }
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
    }
  },
  methods: {
    ...mapActions([
      'selectUser',
      'removeSelection',
      'updateUser',
      'saveEventObserver',
      'changeUserValidation'
    ]),
    select (): void {
      if (!this.selectCondition) {
        this.$store.dispatch('selectUser', this.user.id)
      } else {
        this.$store.dispatch('removeSelection', this.user.id)
      }
    },
    userName (value: string): void {
      this.name = value
    },
    userPhone (value: string): void {
      this.phone = value
    },
    userEmail (value: string): void {
      this.email = value
    },
    userRegistration (value: string): void {
      this.registration = value
    },
    userCode (value: string): void {
      this.code = value
    },
    userCity (value: string): void {
      this.city = value
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
          selected: false,
          valid: this.user.valid
        })
        this.$nextTick(() => {
          this.$store.dispatch('editEventObserver', false)
        })
        this.$nextTick(() => {
          this.$store.dispatch('saveEventObserver', false)
        })
      }
    },
    isAllValid (): void {
      if (this.isAllValid) {
        this.$store.dispatch('changeUserValidation', {
          id: this.user.id,
          valid: true
        })
      } else {
        this.$store.dispatch('changeUserValidation', {
          id: this.user.id,
          valid: false
        })
      }
    }
  }
}
</script>
