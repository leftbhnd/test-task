<template>
  <td :style="{ flex: '1 1 ' + width }">
    <input
      v-if="editCondition"
      class="table-input"
      type="text"
      v-model="value"
      :style="dataValid"
    />
    <span v-else>{{ userData }}</span>
  </td>
</template>

<script lang="ts">
import { mapGetters } from 'vuex'
import { Validator } from '@/helpers/validator'

const validator = new Validator()
export default {
  name: 'TDWrapper',
  props: {
    type: { type: String },
    userData: { type: String },
    isSelected: { type: Boolean },
    width: { type: String }
  },
  data (): { value: string } {
    return {
      value: this.userData
    }
  },
  computed: {
    ...mapGetters(['getEditEvent']),
    editCondition (): boolean {
      return this.getEditEvent && this.isSelected
    },
    dataValid (): string {
      if (validator.isValid({ type: this.type, value: this.data })) {
        return 'border: 1px solid #4aa6ff;'
      } else {
        return 'border: 1px solid red;'
      }
    }
  },
  watch: {
    value (): void {
      this.$emit('value', this.value)
    }
  }
}
</script>
