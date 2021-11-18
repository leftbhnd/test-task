<template>
  <thead>
    <tr class="trow">
      <th class="trow__checkbox" @click="selectAll" :style="isNewUser">
        <IconWrapper class="checkbox" :src="checkbox" />
      </th>
      <th class="trow__name">
        <span class="trow__label">Пользователь</span>
      </th>
      <th class="trow__phone">
        <span class="trow__label">Номер телефона</span>
      </th>
      <th class="trow__email">
        <span class="trow__label">Email</span>
      </th>
      <th class="trow__registration">
        <span class="trow__label">Дата региcтрации</span>
      </th>
      <th class="trow__code">
        <span class="trow__label">Код</span>
      </th>
      <th class="trow__city">
        <span class="trow__label">Город</span>
      </th>
    </tr>
  </thead>
</template>

<script lang="ts">
import { mapGetters, mapActions } from 'vuex'
import IconWrapper from '@/components/wrappers/IconWrapper.vue'

export default {
  name: 'HeaderRow',
  components: {
    IconWrapper
  },
  data (): { checked: boolean } {
    return {
      checked: false
    }
  },
  computed: {
    ...mapGetters(['getNewUserState', 'getUsers', 'getSelectedUsers']),
    checkbox (): string {
      if (this.getUsers.length === this.getSelectedUsers.length) {
        return require('@/assets/svg/checked.svg')
      } else if (this.getSelectedUsers.length > 0) {
        return require('@/assets/svg/checkSeveral.svg')
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
    ...mapActions(['selectEventObserver', 'selectAllUsers']),
    selectAll (): void {
      this.checked = !this.checked
      if (this.checked) {
        this.$store.dispatch('selectAllUsers', true)
      } else {
        this.$store.dispatch('selectAllUsers', false)
      }
    }
  },
  watch: {
    getSelectedUsers (): void {
      if (this.getSelectedUsers.length !== this.getUsers.length) {
        this.checked = false
      }
    }
  }
}
</script>

<style lang="scss"></style>
