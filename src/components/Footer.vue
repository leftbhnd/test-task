<template>
  <footer class="footer container">
    <section class="footer__item-user">
      <span class="footer__show-by"> Отображать по: </span>
      <div class="footer__selector">
        <Select :options="usersCount" :default="10" @option="usersOption" />
      </div>
      <span class="footer__all-users">
        1-{{ currentUsers }} из {{ getUsers.length }} пользователей
      </span>
    </section>
    <section class="footer__item-page">
      <div class="footer__page">
        <Select
          class="footer__selector"
          :options="pagesCount"
          :default="1"
          @option="pagesOption"
        />
        <span class="footer__page-counter">
          из {{ pagesCount.length }} страниц
        </span>
      </div>
      <button class="footer__nav">
        <Icon :src="prev" />
      </button>
      <button class="footer__nav">
        <Icon :src="next" />
      </button>
    </section>
  </footer>
</template>

<script lang="ts">
import Icon from '@/components/wrappers/IconWrapper.vue'
import Select from '@/components/wrappers/SelectWrapper.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'Footer',
  components: {
    Icon,
    Select
  },
  data (): { usersCount: number[]; pagesCount: number[]; currentUsers: number } {
    return {
      usersCount: [10, 15, 20, 25, 50],
      pagesCount: [1, 2, 3, 4, 5, 6, 7],
      currentUsers: 10
    }
  },
  computed: {
    ...mapGetters(['getUsers']),
    next (): string {
      return require('@/assets/svg/next.svg')
    },
    prev (): string {
      return require('@/assets/svg/prev.svg')
    }
  },
  methods: {
    usersOption (value: number): void {
      this.currentUsers = value
      console.log(value)
    },
    pagesOption (value: number): void {
      console.log(value)
    }
  }
}
</script>

<style lang="scss">
.footer {
  display: flex;
  justify-content: space-between;

  width: 100%;
  height: 48px;

  background-color: #ffffff;

  &__item-user {
    display: flex;
    align-items: center;
    flex: 0 0 457px;
  }
  &__item-page {
    display: flex;
    align-items: center;
    flex: 0 0 317px;
  }
  &__show-by {
    display: flex;
    align-items: center;
    flex: 1 0 136px;

    height: 48px;
    padding-left: 16px;
  }
  &__selector {
    flex: 0 0 79px;

    height: 48px;

    border-right: 1px solid #f0f2f4;
  }
  &__all-users {
    display: flex;
    align-items: center;
    flex: 1 0 242px;

    height: 48px;
    padding-left: 16px;

    color: #7b8395;
    border-right: 1px solid #f0f2f4;
  }
  &__page {
    display: flex;
    align-items: center;
    flex: 1 0 221px;

    color: #7b8395;
  }
  &__page-counter {
    display: flex;
    align-items: center;
    flex: 1 0 142px;

    height: 48px;
    padding-left: 16px;

    color: #7b8395;
    border-right: 1px solid #f0f2f4;
  }
  &__nav {
    display: flex;
    align-items: center;
    flex: 1 0 48px;
    justify-content: center;

    width: 48px;
    height: 48px;

    border-right: 1px solid #f0f2f4;
    background-color: #ffffff;
  }
  &__nav:last-child {
    border-right: none;
  }
  &__nav:hover {
    background-color: #f0f2f4;
  }
}
</style>
