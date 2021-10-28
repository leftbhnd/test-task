<template>
  <img :src="src" :style="{ transform: 'rotate(' + degree + 'deg)' }" />
</template>

<script lang="js">
export default {
  name: 'Icon',
  props: {
    src: { type: String, require: true },
    degree: { type: String, default: '0' }
  }
}
</script>
