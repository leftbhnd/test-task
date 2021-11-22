<template>
  <div>
    <HeaderEdit v-if="getEditEvent" :type="type" />
    <header class="header-select container" v-else>
      <div class="header-select__title">
        <span>Выделено: {{ usersCount }}</span>
      </div>
      <div class="header-select__control control">
        <button class="header-select__edit" @click="editUsers">
          Редактировать
          <IconWrapper :src="edit" />
        </button>
        <button class="header-select__delete" @click="deleteUsers">
          Удалить
          <IconWrapper :src="basket" />
        </button>
        <button class="header-select__cancel" @click="cancelSelection">
          Отмена
        </button>
      </div>
    </header>
  </div>
</template>

<script lang="ts">
import { mapGetters, mapActions } from 'vuex'
import HeaderEdit from '@/components/headers/HeaderEdit.vue'
import IconWrapper from '@/components/wrappers/IconWrapper.vue'

export default {
  name: 'HeaderSelect',
  components: {
    HeaderEdit,
    IconWrapper
  },
  data (): { type: string } {
    return {
      type: 'edit'
    }
  },
  computed: {
    ...mapGetters(['getEditEvent', 'getSelectedUsers']),
    usersCount (): number {
      return this.getSelectedUsers.length
    },
    edit (): string {
      return require('@/assets/svg/edit.svg')
    },
    basket (): string {
      return require('@/assets/svg/delete.svg')
    }
  },
  methods: {
    ...mapActions(['selectAllUsers', 'deleteUser', 'editEventObserver']),
    editUsers (): void {
      this.$store.dispatch('editEventObserver', true)
    },
    deleteUsers (): void {
      this.$store.dispatch('deleteUser')
      this.$nextTick(() => {
        this.$store.dispatch('selectAllUsers', false)
      })
    },
    cancelSelection (): void {
      this.$store.dispatch('selectAllUsers', false)
    }
  }
}
</script>

<style lang="scss">
.header-select {
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 48px;

  color: #ffffff;
  background-color: #1f232e;
  &__title {
    flex: 0 0 125px;

    padding: 16px;
  }
  &__control {
    display: flex;
    flex: 0 0 372px;
  }
  &__edit {
    display: flex;
    justify-content: space-between;
    flex: 0 0 170px;
  }
  &__edit:hover {
    background-color: #3e424b;
  }
  &__delete {
    display: flex;
    justify-content: space-between;
    flex: 0 0 119px;
  }
  &__delete:hover {
    background-color: #3e424b;
  }
  &__cancel {
    flex: 0 0 83px;
  }
  &__cancel:hover {
    background-color: #3e424b;
  }
  &__edit,
  &__delete,
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
