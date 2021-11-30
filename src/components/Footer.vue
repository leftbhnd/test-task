<template>
  <footer class="footer container" :style="editObserver">
    <section class="footer__item-user">
      <span class="footer__show-by"> Отображать по: </span>
      <div class="footer__selector">
        <SelectWrapper
          :options="usersOptions"
          :value="usersCount"
          @option="usersCountOption"
        />
      </div>
      <span class="footer__all-users">
        {{ usersCountStart }}-{{ usersCountEnd }} из
        {{ getUsers.length }} пользователей
      </span>
    </section>
    <section class="footer__item-page">
      <div class="footer__page">
        <SelectWrapper
          class="footer__selector"
          :options="pages"
          :value="pagesCount"
          @option="pagesCountOption"
        />
        <span class="footer__page-counter">
          из {{ pages.length }} страниц
        </span>
      </div>
      <button class="footer__nav" @click="prevPage" :style="prevStyle">
        <Icon :src="prev" />
      </button>
      <button class="footer__nav" @click="nextPage" :style="nextStyle">
        <Icon :src="next" />
      </button>
    </section>
  </footer>
</template>

<script lang="ts">
import Icon from '@/components/wrappers/IconWrapper.vue'
import SelectWrapper from '@/components/wrappers/SelectWrapper.vue'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Footer',
  components: {
    Icon,
    SelectWrapper
  },
  data (): {
    usersOptions: number[]
    usersCount: number
    pagesCount: number
    } {
    return {
      usersOptions: [10, 15, 20, 50, 100],
      usersCount: 15,
      pagesCount: 1
    }
  },
  computed: {
    ...mapGetters(['getUsers', 'getNewUserState', 'getEditEvent']),
    isEditCondition (): boolean {
      return this.getNewUserState || this.getEditEvent
    },
    editObserver (): string {
      return this.isEditCondition
        ? 'pointer-events: none;'
        : 'pointer-events: auto;'
    },
    next (): string {
      return require('@/assets/svg/next.svg')
    },
    prev (): string {
      return require('@/assets/svg/prev.svg')
    },
    prevStyle (): string {
      return this.pagesCount === 1
        ? 'pointer-events: none;'
        : 'pointer-events: auto;'
    },
    nextStyle (): string {
      return this.pagesCount === this.pages.length
        ? 'pointer-events: none;'
        : 'pointer-events: auto;'
    },
    pages (): number[] {
      const pagesNumbers = Math.ceil(this.getUsers.length / this.usersCount)
      return pagesNumbers !== 0
        ? Array.from({ length: pagesNumbers }, (_, i: number) => i + 1)
        : Array.from({ length: 1 }, (_, i: number) => i + 1)
    },
    usersCountStart (): number {
      return this.usersCount * this.pagesCount - this.usersCount + 1
    },
    usersCountEnd (): void {
      const finish = this.usersCountStart + this.usersCount - 1
      return finish > this.getUsers.length ? this.getUsers.length : finish
    }
  },
  methods: {
    ...mapActions(['setPaginationStart', 'setPaginationEnd']),
    usersCountOption (value: number): void {
      this.usersCount = value
    },
    pagesCountOption (value: number): void {
      this.pagesCount = value
    },
    prevPage (): void {
      this.pagesCount--
    },
    nextPage (): void {
      this.pagesCount++
    }
  },
  watch: {
    usersCountStart (): void {
      this.$store.dispatch('setPaginationStart', this.usersCountStart - 1)
    },
    usersCountEnd (): void {
      this.$store.dispatch('setPaginationEnd', this.usersCountEnd)
    },
    pages (): void {
      if (this.pagesCount > this.pages.length) {
        this.pagesCount = this.pages.length
      }
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

  border: 1px solid #c6d1dd80;
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

    height: 46px;

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
    height: 46px;

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
