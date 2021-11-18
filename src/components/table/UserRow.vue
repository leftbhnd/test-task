<template>
  <tr>
    <td class="trow__checkbox" @click="select" :style="isNewUser">
      <IconWrapper class="checkbox" :src="checkboxState" />
    </td>
    <td class="trow__name">
      <input
        disabled="disabled"
        class="row-input"
        type="text"
        :value="user.name"
      />
    </td>
    <td class="trow__phone">
      <input
        disabled="disabled"
        class="row-input"
        type="text"
        :value="user.phone"
      />
    </td>
    <td class="trow__email">
      <input
        disabled="disabled"
        class="row-input"
        type="text"
        :value="user.email"
      />
    </td>
    <td class="trow__registration">
      <input
        disabled="disabled"
        class="row-input"
        type="text"
        :value="user.registration"
      />
    </td>
    <td class="trow__code">
      <input
        disabled="disabled"
        class="row-input"
        type="text"
        :value="user.code"
      />
    </td>
    <td class="trow__city">
      <input
        disabled="disabled"
        class="row-input"
        type="text"
        :value="user.city"
      />
    </td>
  </tr>
</template>

<script lang="ts">
import { mapGetters, mapActions } from 'vuex'
import IconWrapper from '@/components/wrappers/IconWrapper.vue'
import { isElementInArray } from '@/helpers/helpers'

export default {
  name: 'UserRow',
  components: {
    IconWrapper
  },
  props: {
    user: Object,
    id: Number
  },
  data (): { checked: boolean } {
    return {
      checked: false
    }
  },
  computed: {
    ...mapGetters(['getNewUserState', 'getSelectedUsers']),
    checkboxState (): string {
      if (this.checked) {
        return require('@/assets/svg/checked.svg')
      } else {
        return require('@/assets/svg/unchecked.svg')
      }
    },
    isNewUser (): string {
      if (this.getNewUserState) {
        return 'pointer-events: none;'
      } else {
        return 'pointer-events: auto;'
      }
    }
  },
  methods: {
    ...mapActions(['selectUser', 'removeSelection']),
    select (): void {
      this.checked = !this.checked
      if (this.checked) {
        this.$store.dispatch('selectUser', this.user)
      } else {
        this.$store.dispatch('removeSelection', this.id)
      }
    }
  },
  watch: {
    getSelectedUsers (): void {
      if (isElementInArray(this.id, this.getSelectedUsers)) {
        this.checked = true
      } else {
        this.checked = false
      }
    }
  }
}
</script>

<style lang="scss"></style>
