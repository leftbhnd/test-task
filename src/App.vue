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
  min-height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.container {
  max-width: 1440px;
  margin: 0 auto;
}
.content {
  flex: 1 1 auto;
}
</style>
