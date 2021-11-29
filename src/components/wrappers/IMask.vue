<template>
  <td>
    <imask-input
      class="table-input"
      v-model="inputValue"
      :mask="inputInfo.mask"
      :style="inputStyle"
      :placeholder="inputInfo.placeholder"
    />
  </td>
</template>

<script lang="ts">
import { IMaskComponent } from 'vue-imask'
import { Validator } from '@/helpers/validator'

const validator = new Validator()

export default {
  name: 'IMask',
  props: {
    value: { type: String, default: '' },
    inputInfo: Object
  },
  components: {
    'imask-input': IMaskComponent
  },
  data (): { inputValue: string } {
    return {
      inputValue: this.value
    }
  },
  computed: {
    inputStyle (): string {
      return validator.isValid({
        type: this.inputInfo.type,
        value: this.inputValue
      })
        ? 'border: 1px solid #4aa6ff;'
        : 'border: 1px solid red;'
    }
  },
  watch: {
    inputValue (): void {
      this.$emit('inputValue', this.inputValue)
    }
  }
}
</script>
