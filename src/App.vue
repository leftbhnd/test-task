<template>
  <div id="app">
    <Header />
    <Main class="content" />
    <Footer />
  </div>
</template>

<script lang="ts">
import Header from '@/components/HeaderWrapper.vue'
import Main from '@/components/Main.vue'
import Footer from '@/components/Footer.vue'
export default {
  name: 'App',
  components: {
    Header,
    Main,
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
