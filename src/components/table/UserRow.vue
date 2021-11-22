<template>
  <tr>
    <td class="trow__checkbox" @click="select" :style="isEditUser">
      <IconWrapper class="checkbox" :src="checkboxState" />
    </td>
    <td class="trow__name">
      <input
        class="table-input"
        type="text"
        v-model="name"
        v-if="editCondition"
      />
      <span v-else>{{ user.name }}</span>
    </td>
    <td class="trow__phone">
      <input
        class="table-input"
        type="text"
        v-model="phone"
        v-if="editCondition"
      />
      <span v-else>{{ user.phone }}</span>
    </td>
    <td class="trow__email">
      <input
        class="table-input"
        type="text"
        v-model="email"
        v-if="editCondition"
      />
      <span v-else>{{ user.email }}</span>
    </td>
    <td class="trow__registration">
      <input
        class="table-input"
        type="text"
        v-model="registration"
        v-if="editCondition"
      />
      <span v-else>{{ user.registration }}</span>
    </td>
    <td class="trow__code">
      <input
        class="table-input"
        type="text"
        v-model="code"
        v-if="editCondition"
      />
      <span v-else>{{ user.code }}</span>
    </td>
    <td class="trow__city">
      <input
        class="table-input"
        type="text"
        v-model="city"
        v-if="editCondition"
      />
      <span v-else>{{ user.city }}</span>
    </td>
  </tr>
</template>

<script lang="ts">
import { mapGetters, mapActions } from 'vuex'
import IconWrapper from '@/components/wrappers/IconWrapper.vue'
import { IUser } from '@/store/types'

export default {
  name: 'UserRow',
  components: {
    IconWrapper
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
      selected: this.user.selected
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
    isEditUser (): string {
      if (this.getNewUserState || this.getEditEvent) {
        return 'pointer-events: none;'
      } else {
        return 'pointer-events: auto;'
      }
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
