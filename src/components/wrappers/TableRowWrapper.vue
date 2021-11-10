<template>
  <tr>
    <td class="trow__checkbox" @click="check" :style="isNewUser">
      <IconWrapper class="checkbox" :src="checkbox" />
    </td>
    <td class="trow__name">
      <input
        disabled="disabled"
        class="trow__label user-input"
        type="text"
        :value="user.name"
      />
    </td>
    <td class="trow__phone">
      <input
        disabled="disabled"
        class="trow__label user-input"
        type="text"
        :value="user.phone"
      />
    </td>
    <td class="trow__email">
      <input
        disabled="disabled"
        class="trow__label user-input"
        type="text"
        :value="user.email"
      />
    </td>
    <td class="trow__registration">
      <input
        disabled="disabled"
        class="trow__label user-input"
        type="text"
        :value="user.registration"
      />
    </td>
    <td class="trow__code">
      <input
        disabled="disabled"
        class="trow__label user-input"
        type="text"
        :value="user.code"
      />
    </td>
    <td class="trow__city">
      <input
        disabled="disabled"
        class="trow__label user-input"
        type="text"
        :value="user.city"
      />
    </td>
  </tr>
</template>

<script lang="ts">
import { mapGetters, mapActions } from 'vuex'
import IconWrapper from '@/components/wrappers/IconWrapper.vue'

export default {
  name: 'TableRowWrapper',
  components: {
    IconWrapper
  },
  props: {
    user: Object
  },
  data () {
    return {
      checked: false
    }
  },
  computed: {
    ...mapGetters(['getNewUserState']),
    checkbox () {
      if (this.checked) {
        return require('@/assets/svg/checked.svg')
      } else {
        return require('@/assets/svg/unchecked.svg')
      }
    },
    isNewUser () {
      if (this.getNewUserState) {
        return 'pointer-events: none;'
      } else {
        return 'pointer-events: auto;'
      }
    }
  },
  methods: {
    ...mapActions(['selectEventObserver']),
    check () {
      this.checked = !this.checked
    }
  },
  watch: {
    checked () {
      if (this.checked) {
        this.$store.dispatch('selectEventObserver', true)
      } else {
        this.$store.dispatch('selectEventObserver', false)
      }
    }
  }
}
</script>

<style lang="scss">
.checkbox {
  cursor: pointer;
}
</style>
