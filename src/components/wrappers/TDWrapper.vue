<template>
  <td>
    <input
      v-if="editCondition"
      class="table-input"
      type="text"
      v-model="value"
      :style="inputStyle"
    />
    <span class="trow__label" :style="textStyle" v-else>{{ userData }}</span>
  </td>
</template>

<script lang="ts">
import { mapGetters, mapActions } from 'vuex'
import { Validator } from '@/helpers/validator'

const validator = new Validator()

export default {
  name: 'TDWrapper',
  props: {
    userData: String,
    // userInfo: { isSelected: boolean, isValid: boolean, id: Number, isEdit: boolean }
    userInfo: Object,
    type: String
  },
  data (): { value: string; inputStyle: string } {
    return {
      value: this.userData,
      inputStyle: 'border: 1px solid #4aa6ff;'
    }
  },
  computed: {
    ...mapGetters(['getEditEvent']),
    editCondition (): boolean {
      return this.getEditEvent && this.userInfo.isSelected
    },
    isValueValid (): boolean {
      return validator.isValid({ type: this.type, value: this.value })
    },
    textStyle (): string {
      if (this.userInfo.isEdit) {
        return 'color: #7b8395;'
      } else {
        return 'color: #1f232e;'
      }
    }
  },
  methods: {
    ...mapActions(['validationObserver'])
  },
  watch: {
    value (): void {
      this.$emit('value', this.value)
      if (!this.isValueValid) {
        this.$store.dispatch('validationObserver', {
          id: this.userInfo.id,
          type: this.type,
          value: this.value
        })
      }
    },
    getEditEvent (): void {
      if (!this.editCondition) {
        this.value = this.userData
      }
    },
    isValueValid (): void {
      if (this.isValueValid) {
        this.inputStyle = 'border: 1px solid #4aa6ff;'
      } else {
        this.inputStyle = 'border: 1px solid red;'
      }
    }
  }
}
</script>
