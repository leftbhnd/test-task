<template>
  <div>
    <HeaderSelect v-if="getSelectedUsers.length" />
    <HeaderDefault v-else />
  </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex'
import HeaderDefault from '@/components/headers/HeaderDefault.vue'
import HeaderSelect from '@/components/headers/HeaderSelect.vue'
export default {
  name: 'HeaderWrapper',
  components: {
    HeaderDefault,
    HeaderSelect
  },
  computed: {
    ...mapGetters(['getSelectedUsers'])
  }
}
</script>
