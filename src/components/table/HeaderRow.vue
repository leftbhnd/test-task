<template>
  <thead>
    <tr class="trow">
      <th class="trow__checkbox" @click="selectAll" :style="isEditState">
        <IconWrapper class="checkbox" :src="checkboxState" />
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
  computed: {
    ...mapGetters(['getNewUserState', 'getUsers', 'getSelectedUsers', 'getEditEvent']),
    checkAllConditon (): boolean {
      return this.getUsers.length === this.getSelectedUsers.length && this.getUsers.length
    },
    checkboxState (): string {
      if (this.checkAllConditon) {
        return require('@/assets/svg/checked.svg')
      } else if (this.getSelectedUsers.length) {
        return require('@/assets/svg/checkSeveral.svg')
      } else {
        return require('@/assets/svg/unchecked.svg')
      }
    },
    isEditState (): string {
      if (this.getNewUserState || this.getEditEvent) {
        return 'pointer-events: none;'
      } else {
        return 'pointer-events: auto;'
      }
    }
  },
  methods: {
    ...mapActions(['selectAllUsers']),
    selectAll (): void {
      if (!this.checkAllConditon) {
        this.$store.dispatch('selectAllUsers', true)
      } else {
        this.$store.dispatch('selectAllUsers', false)
      }
    }
  }
}
</script>
