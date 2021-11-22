<template>
  <header class="header-add container">
    <div class="header-add__title">
      <span>{{ title }}</span>
    </div>
    <div class="header-add__control control">
      <button class="header-add__save" @click="save">Сохранить</button>
      <button class="header-add__cancel" @click="cancel">Отмена</button>
    </div>
  </header>
</template>

<script lang="ts">
import { mapActions } from 'vuex'
export default {
  name: 'HeaderEdit',
  props: {
    type: String
  },
  computed: {
    title (): string {
      if (this.type === 'new') {
        return 'Добавление нового пользователя'
      } else {
        return 'Редактирование'
      }
    }
  },
  methods: {
    ...mapActions([
      'newUserObserver',
      'editEventObserver',
      'saveEventObserver'
    ]),
    cancel (): void {
      if (this.type === 'new') {
        this.$store.dispatch('newUserObserver', false)
      } else {
        this.$store.dispatch('editEventObserver', false)
      }
    },
    save (): void {
      this.$store.dispatch('saveEventObserver', true)
      if (this.type === 'new') {
        this.$nextTick(() => {
          this.$store.dispatch('newUserObserver', false)
        })
      }
    }
  }
}
</script>

<style lang="scss">
.header-add {
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 48px;

  color: #ffffff;
  background-color: #1f232e;
  &__title {
    flex: 0 0 284px;

    padding: 16px;
  }
  &__control {
    display: flex;
    flex: 0 0 192px;
  }
  &__save {
    flex: 0 0 108px;
  }
  &__save:hover {
    background-color: #3e424b;
  }
  &__cancel {
    flex: 0 0 83px;
  }
  &__cancel:hover {
    background-color: #3e424b;
  }
  &__save,
  &__cancel {
    width: 100%;
    height: 48px;
    padding: 16px;

    color: #ffffff;
    background-color: #1f232e;

    font-family: IBM Plex Mono;
    font-size: 14px;
    font-weight: normal;
    font-style: normal;
    line-height: 16px;
  }
}
</style>
