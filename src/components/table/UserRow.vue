<template>
  <tr>
    <td class="trow__checkbox" @click="select" :style="isEditUser">
      <IconWrapper class="checkbox" :src="checkboxState" />
    </td>
    <td class="trow__name">
      <input
        class="table-input"
        type="text"
        v-model="currentUser.name"
        v-if="isEdit"
      />
      <span v-else>{{ user.name }}</span>
    </td>
    <td class="trow__phone">
      <input
        class="table-input"
        type="text"
        v-model="currentUser.phone"
        v-if="isEdit"
      />
      <span v-else>{{ user.phone }}</span>
    </td>
    <td class="trow__email">
      <input
        class="table-input"
        type="text"
        v-model="currentUser.email"
        v-if="isEdit"
      />
      <span v-else>{{ user.email }}</span>
    </td>
    <td class="trow__registration">
      <input
        class="table-input"
        type="text"
        v-model="currentUser.registration"
        v-if="isEdit"
      />
      <span v-else>{{ user.registration }}</span>
    </td>
    <td class="trow__code">
      <input
        class="table-input"
        type="text"
        v-model="currentUser.code"
        v-if="isEdit"
      />
      <span v-else>{{ user.code }}</span>
    </td>
    <td class="trow__city">
      <input
        class="table-input"
        type="text"
        v-model="currentUser.city"
        v-if="isEdit"
      />
      <span v-else>{{ user.city }}</span>
    </td>
  </tr>
</template>

<script lang="ts">
import { mapGetters, mapActions } from 'vuex'
import IconWrapper from '@/components/wrappers/IconWrapper.vue'
import { isUserInArray } from '@/helpers/helpers'
import { IApiUser } from '@/store/types'

export default {
  name: 'UserRow',
  components: {
    IconWrapper
  },
  props: {
    user: Object,
    id: Number
  },
  data (): {
    isEdit: boolean
    checked: boolean
    currentUser: IApiUser
    } {
    return {
      isEdit: false,
      checked: false,
      currentUser: {
        name: this.user.name,
        phone: this.user.phone,
        email: this.user.email,
        registration: this.user.registration,
        code: this.user.code,
        city: this.user.city,
        id: this.user.id
      } as IApiUser
    }
  },
  computed: {
    ...mapGetters([
      'getNewUserState',
      'getSelectedUsers',
      'getEditState',
      'getSaveEvent'
    ]),
    checkboxState (): string {
      if (this.checked) {
        return require('@/assets/svg/checked.svg')
      } else {
        return require('@/assets/svg/unchecked.svg')
      }
    },
    isEditUser (): string {
      if (this.getNewUserState || this.getEditState) {
        return 'pointer-events: none;'
      } else {
        return 'pointer-events: auto;'
      }
    },
    selectCondition (): boolean {
      return isUserInArray(this.user, this.getSelectedUsers)
    },
    saveCondition (): boolean {
      return this.getSaveEvent && this.selectCondition
    },
    editCondition (): boolean {
      return this.getEditState && this.selectCondition
    }
  },
  methods: {
    ...mapActions([
      'selectUser',
      'removeSelection',
      'updateUser',
      'saveEventObserver'
    ]),
    select (): void {
      this.checked = !this.checked
      if (this.checked) {
        this.$store.dispatch('selectUser', this.id)
      } else {
        this.$store.dispatch('removeSelection', this.id)
      }
    }
  },
  watch: {
    getSelectedUsers (): void {
      if (this.selectCondition) {
        this.checked = true
      } else {
        this.checked = false
      }
    },
    getSaveEvent (): void {
      if (this.saveCondition) {
        this.$store.dispatch('updateUser', {
          id: this.user.id,
          user: this.currentUser
        })
        this.isEdit = false
        this.$nextTick(() => {
          this.$store.dispatch('editObserver', false)
        })
        this.$nextTick(() => {
          this.$store.dispatch('saveEventObserver', false)
        })
      }
    },
    getEditState (): void {
      if (this.editCondition) {
        console.log(this.user)
        this.isEdit = true
      } else {
        this.isEdit = false
        this.currentUser = this.user
      }
    }
  }
}
</script>

<style lang="scss"></style>
