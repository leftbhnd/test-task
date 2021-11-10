<template>
  <table class="table container">
    <tbody class="table__body">
      <HeaderRow class="table__header" />
      <NewUserRow v-if="getNewUserState" />
      <UserRow
        v-for="(user, index) in getUsers"
        :key="index"
        :user="user"
        :id="index"
        class="trow"
      />
    </tbody>
  </table>
</template>

<script lang="ts">
import { mapGetters } from 'vuex'
import HeaderRow from '@/components/table/HeaderRow.vue'
import NewUserRow from '@/components/table/NewUserRow.vue'
import UserRow from '@/components/table/UserRow.vue'

export default {
  name: 'TableWrapper',
  components: {
    HeaderRow,
    NewUserRow,
    UserRow
  },
  computed: {
    ...mapGetters(['getUsers', 'getNewUserState'])
  }
}
</script>

<style lang="scss">
.table {
  display: flex;
  flex-direction: column;

  width: 100%;

  background-color: #ffffff;
  &__header {
    display: flex;

    border-top: 1px solid #c6d1dd80;
    background-color: #f0f2f480;
  }
}
.trow {
  display: flex;
  flex: 1 1 100%;
  &__checkbox {
    flex: 0 0 48px;
    justify-content: center;
  }
  &__name {
    flex: 1 1 300px;

    padding: 3px;
  }
  &__phone {
    flex: 1 1 210px;

    padding: 3px;
  }
  &__email {
    flex: 1 1 350px;

    padding: 3px;
  }
  &__registration {
    flex: 1 1 220px;

    padding: 3px;
  }
  &__code {
    flex: 1 1 100px;

    padding: 3px;
  }
  &__city {
    flex: 1 1 212px;

    padding: 3px;

    border-right: 1px solid #c6d1dd80;
  }
  &__label {
    padding-left: 14px;

    color: #7b8395;

    font-family: IBM Plex Mono;
    font-size: 12px;
    font-weight: 500;
    font-style: normal;
    line-height: 16px;
  }
}
th,
td {
  display: flex;
  align-items: center;

  height: 48px;

  border-bottom: 1px solid #c6d1dd80;
  border-left: 1px solid #c6d1dd80;
}
.row-input {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding-left: 14px;

  background-color: #ffffff;
}
.edit-input {
  border: 1px solid #4aa6ff;
  border-radius: 4px;
}
.checkbox {
  cursor: pointer;
}
</style>
