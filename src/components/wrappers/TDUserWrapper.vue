<template>
  <td>
    <imask-input
      v-if="editCondition"
      class="table-input"
      type="text"
      v-model="inputValue"
      :mask="inputInfo.mask"
      :style="inputStyle"
      :placeholder="inputInfo.placeholder"
    />
    <span class="trow__label" :style="textStyle" v-else>{{ inputValue }}</span>
  </td>
</template>

<script lang="ts">
import { mapGetters, mapActions } from 'vuex'
import { IMaskComponent } from 'vue-imask'
import { Validator } from '@/helpers/validator'

const validator = new Validator()

export default {
  name: 'TDUserWrapper',
  props: {
    value: String,
    userInfo: Object,
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
    ...mapGetters(['getEditEvent']),
    editCondition (): boolean {
      return this.getEditEvent && this.userInfo.isSelected
    },
    isValueValid (): boolean {
      return validator.isValid({
        type: this.inputInfo.type,
        value: this.inputValue
      })
    },
    inputStyle (): string {
      return this.isValueValid
        ? 'border: 1px solid #4aa6ff;'
        : 'border: 1px solid red;'
    },
    textStyle (): string {
      return this.userInfo.isEdit ? 'color: #7b8395;' : 'color: #1f232e;'
    }
  },
  methods: {
    ...mapActions(['validationObserver'])
  },
  watch: {
    inputValue (): void {
      this.$emit('inputValue', this.inputValue)
      if (!this.isValueValid) {
        this.$store.dispatch('validationObserver', {
          id: this.userInfo.id,
          type: this.inputInfo.type,
          value: this.inputValue
        })
      }
    },
    getEditEvent (): void {
      if (!this.editCondition) {
        this.inputValue = this.value
      }
    }
  }
}
</script>
