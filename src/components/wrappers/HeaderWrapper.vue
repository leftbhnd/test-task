<template>
  <div>
    <HeaderSelect v-if="getSelectState"/>
    <HeaderDefault v-else />
  </div>
</template>

<script lang="ts">
import HeaderDefault from '@/components/headers/HeaderDefault.vue'
import HeaderSelect from '@/components/headers/HeaderSelect.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'HeaderWrapper',
  components: {
    HeaderDefault,
    HeaderSelect
  },
  computed: {
    ...mapGetters(['getSelectState'])
  }
}
</script>
