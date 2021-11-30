<template>
  <div id="app">
    <HeaderWrapper />
    <TableWrapper class="content" />
    <Footer />
  </div>
</template>

<script lang="ts">
import HeaderWrapper from '@/components/wrappers/HeaderWrapper.vue'
import TableWrapper from '@/components/wrappers/TableWrapper.vue'
import Footer from '@/components/Footer.vue'
export default {
  name: 'App',
  components: {
    HeaderWrapper,
    TableWrapper,
    Footer
  }
}
</script>

<style lang="scss">
#app {
  display: flex;
  overflow: hidden;
  flex-direction: column;

  height: 744px;
}
.container {
  max-width: 1440px;
  margin: 0 auto;
}
.content {
  overflow: auto;
  flex: 1 1 auto;
}
.content::-webkit-scrollbar {
  width: 7px;

  background-color: #ffffff;
}
.content::-webkit-scrollbar-thumb {
  border-radius: 100px;
  background-color: #b4b8c1;
}
</style>
