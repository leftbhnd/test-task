<template>
  <div class="select">
    <div
      class="select__selected selected"
      @click="open = !open"
      :style="hoverSetter"
    >
      <span class="selected__text">{{ selected }}</span>
      <Icon :src="selectorArrow" class="selected__icon" />
    </div>
    <div class="select__options" v-show="open">
      <div
        class="select__option option"
        v-for="(option, index) in options"
        :key="index"
        @click="changeOption(option)"
      >
        <span class="option__text">{{ option }}</span>
        <div class="option__icon">
          <Icon v-if="option == selected" :src="check" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex'
import Icon from '@/components/wrappers/IconWrapper.vue'

export default {
  name: 'SelectWrapper',
  components: {
    Icon
  },
  props: {
    options: Array,
    value: { type: Number, default: 1 }
  },
  data (): { selected: number; open: boolean } {
    return {
      selected: this.value,
      open: false
    }
  },
  computed: {
    ...mapGetters(['getNewUserState', 'getEditEvent', 'getSelectedUsers']),
    isDisableCondition (): boolean {
      return (
        this.getNewUserState ||
        this.getEditEvent ||
        this.getSelectedUsers.length
      )
    },
    check (): string {
      return require('@/assets/svg/check.svg')
    },
    selectorArrow (): string {
      return require('@/assets/svg/selectArrow.svg')
    },
    hoverSetter (): string {
      return this.open
        ? 'background-color: #f0f2f4;'
        : 'background-color: #ffffff;'
    }
  },
  methods: {
    changeOption (option: number): void {
      this.selected = option
      this.open = false
      this.$emit('option', option)
    }
  },
  watch: {
    options (): void {
      this.changeOption(this.value)
    },
    value (): void {
      this.changeOption(this.value)
    },
    isDisableCondition (): void {
      this.open = false
    }
  }
}
</script>

<style lang="scss">
.select {
  position: relative;

  height: 100%;

  cursor: pointer;
  &__selected {
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 16px;
  }
  &__options {
    position: absolute;
    z-index: 1;
    bottom: 48px;

    display: flex;
    overflow-x: hidden;
    overflow-y: auto;
    flex: 1 1 auto;
    flex-direction: column;

    min-width: 81px;
    max-height: 336px;

    border-radius: 6px;
    background-color: #ffffff;
    box-shadow: 0px 12px 24px rgba(86, 105, 123, 0.12);
  }
  &__options::-webkit-scrollbar {
    width: 7px;

    background-color: #ffffff;
  }
  &__options::-webkit-scrollbar-thumb {
    border-radius: 100px;
    background-color: #b4b8c1;
  }
  &__option {
    display: flex;
    align-items: center;

    width: 100%;
    min-height: 32px;

    cursor: pointer;
  }
}
.option {
  display: flex;
  &__text {
    display: flex;
    align-items: center;
    flex: 1 0 50px;

    height: 100%;
    padding-left: 16px;
  }
  &__icon {
    display: flex;
    align-items: center;
    flex: 0 0 20px;

    height: 100%;
  }
}
.selected {
  display: flex;
  align-items: center;
  &__text {
    flex: 0 0 30px;
  }
}
</style>
