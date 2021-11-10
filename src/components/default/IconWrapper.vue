<template>
  <img :src="src" :style="{ transform: 'rotate(' + degree + 'deg)' }" />
</template>

<script lang="ts">
export default {
  name: 'Icon',
  props: {
    src: { type: String },
    degree: { type: String, default: '0' }
  }
}
</script>
