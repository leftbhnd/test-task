<template>
  <div>
    <HeaderEdit v-if="getNewUserState" :type="type" />
    <header class="header-default container" v-else>
      <section v-if="searchState" class="header-default__search enabled">
        <div class="enabled__search">
          <Icon :src="search" />
        </div>
        <input
          class="enabled__input"
          type="text"
          ref="searchFocus"
          v-model="searchValue"
        />
        <button
          class="enabled__clear"
          @click="clearInput"
          v-show="searchValue.length"
        >
          <Icon :src="clear" />
        </button>
        <button class="enabled__cancel" @click="hideSearch">Отмена</button>
      </section>
      <section v-else class="header-default__search disabled">
        <div class="disabled__title">Folder 31-190</div>
        <button class="disabled__search" @click="showSearch">
          <Icon :src="search" />
        </button>
      </section>
      <button class="header-default__add" @click="addNewUser">
        <Icon :src="add" />
        <span>Добавить пользователя</span>
      </button>
    </header>
  </div>
</template>

<script lang="ts">
import Icon from '@/components/wrappers/IconWrapper.vue'
import HeaderEdit from '@/components/headers/HeaderEdit.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'HeaderDefault',
  components: {
    HeaderEdit,
    Icon
  },
  data (): { type: string; searchState: boolean; searchValue: string } {
    return {
      type: 'new',
      searchState: false,
      searchValue: ''
    }
  },
  computed: {
    ...mapGetters(['getNewUserState']),
    add (): string {
      return require('@/assets/svg/add.svg')
    },
    search (): string {
      return require('@/assets/svg/search.svg')
    },
    clear (): string {
      return require('@/assets/svg/clear.svg')
    }
  },
  methods: {
    ...mapActions(['newUserObserver']),
    showSearch (): void {
      this.searchState = true
      setTimeout(() => {
        this.$refs.searchFocus.focus()
      }, 100)
    },
    hideSearch (): void {
      this.searchState = false
      this.searchValue = ''
    },
    clearInput (): void {
      this.searchValue = ''
      setTimeout(() => {
        this.$refs.searchFocus.focus()
      }, 100)
    },
    addNewUser (): void {
      this.$store.dispatch('newUserObserver', true)
    }
  }
}
</script>

<style lang="scss">
.header-default {
  display: flex;
  justify-content: space-between;

  width: 100%;
  height: 48px;

  background-color: #ffffff;
  &__search {
    display: flex;
    flex: 0 1 1215px;

    background-color: #ffffff;
  }
  &__add {
    display: flex;
    align-items: center;
    flex: 0 0 225px;
    justify-content: space-between;

    padding-right: 12px;
    padding-left: 15px;

    color: #ffffff;
    background-color: #316bff;

    font-family: IBM Plex Mono;
    font-size: 14px;
    font-weight: 500;
    font-style: normal;
    line-height: 16px;
  }
  &__add:hover {
    background-color: #1049dc;
  }
}
.disabled {
  &__title {
    display: flex;
    align-items: center;
    flex: 1 1 1167px;

    padding-left: 16px;

    color: #1f232e;

    font-family: Work Sans;
    font-size: 14px;
    font-weight: 500;
    font-style: normal;
    line-height: 16px;
  }
  &__search {
    width: 48px;
    height: 48px;

    background-color: #ffffff;
  }
  &__search:hover {
    background-color: #f0f2f4;
  }
}
.enabled {
  &__search {
    display: flex;
    align-items: center;
    flex: 0 0 48px;
    justify-content: center;

    background-color: #ffffff;
  }
  &__input {
    display: flex;
    align-items: center;
    flex: 1 1 990px;

    height: 100%;

    color: #1f232e;

    font-family: Work Sans;
    font-size: 14px;
    font-weight: normal;
    font-style: normal;
    line-height: 16px;
  }
  &__clear {
    flex: 0 0 48px;

    background-color: #ffffff;
  }
  &__cancel {
    display: flex;
    align-items: center;
    flex: 0 0 84px;
    justify-content: center;

    width: 100%;
    height: 48px;

    color: #7b8395;
    border-left: 2px solid #f0f2f4;
    background-color: #ffffff;

    font-family: IBM Plex Mono;
    font-size: 14px;
    font-weight: normal;
    font-style: normal;
    line-height: 16px;
  }
  &__cancel:hover {
    color: #1f232e;
    background-color: #f0f2f4;
  }
}
</style>
