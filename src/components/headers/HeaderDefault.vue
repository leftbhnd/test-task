/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
<template>
  <header class="header">
    <div class="container">
      <div class="header__row">
        <section v-if="searchState" class="header__search enabled">
          <div class="search">
            <Icon :src="search" />
          </div>
          <input
            type="text"
            class="enabled__input"
            ref="searchFocus"
            v-model="searchValue"
          />
          <button
            class="enabled__clear"
            @click="clearInput"
            v-show="searchValue.length"
          >
            <div class="clear">
              <Icon :src="clear" />
            </div>
          </button>
          <button class="enabled__cancel" @click="hideSearch">
            <p class="cancel">Отмена</p>
          </button>
        </section>
        <section v-else class="header__search disabled">
          <div class="disabled__title">
            <p>Folder 31-190</p>
          </div>
          <button class="disabled__search" @click="showSearch">
            <div class="search">
              <Icon :src="search" />
            </div>
          </button>
        </section>
        <button class="header__add">
          <div class="add">
            <Icon :src="add" />
            <p class="add__label">Добавить пользователя</p>
          </div>
        </button>
      </div>
    </div>
  </header>
</template>

<script lang="js">
import Icon from '@/components/blocks/IconWrapper.vue'
export default {
  name: 'Header',
  components: {
    Icon
  },
  data () {
    return {
      searchState: false,
      searchValue: ''
    }
  },
  computed: {
    add () {
      return require('@/assets/svg/add.svg')
    },
    search () {
      return require('@/assets/svg/search.svg')
    },
    clear () {
      return require('@/assets/svg/clear.svg')
    }
  },
  methods: {
    showSearch () {
      this.searchState = true
      setTimeout(() => {
        this.$refs.searchFocus.focus()
      }, 100)
    },
    hideSearch () {
      this.searchState = false
      this.searchValue = ''
    },
    clearInput () {
      this.searchValue = ''
      setTimeout(() => {
        this.$refs.searchFocus.focus()
      }, 100)
    }
  }
}
</script>

<style lang="scss">
.header {
  background-color: #ffffff;
  &__row {
    height: 48px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  &__add {
    background-color: #316bff;
    flex: 0 0 225px;
  }
  &__add :hover {
    background-color: #1049dc;
  }
  &__search {
    display: flex;
    flex: 0 1 1215px;
    background-color: #ffffff;
  }
}
.disabled {
  display: flex;
  align-items: center;
  &__title {
    flex: 1 1 1167px;
    font-family: Work Sans;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    color: #1f232e;
  }
  &__search {
    height: 100%;
    background-color: #ffffff;
  }
  &__search :hover {
    background-color: #f0f2f4;
    color: #1f232e;
  }
}
.enabled {
  display: flex;
  align-items: center;
  &__search {
    background-color: #ffffff;
    flex: 0 0 48px;
  }
  &__input {
    flex: 1 1 990px;
    font-family: Work Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    color: #1f232e;
    height: 100%;
  }
  &__clear {
    height: 100%;
    background-color: #ffffff;
    flex: 0 0 48px;
  }
  &__cancel {
    display: flex;
    background-color: #ffffff;
    flex: 0 0 83px;
    height: 48px;
    border-left: 2px solid #f0f2f4;
  }
  &__cancel :hover {
    background-color: #f0f2f4;
    color: #1f232e;
  }
}
.search {
  width: 48px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.cancel {
  font-family: IBM Plex Mono;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: #7b8395;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.add {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 0 16px;
  &__label {
    padding: 0 8px;
    font-family: IBM Plex Mono;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    color: #ffffff;
  }
}
</style>
