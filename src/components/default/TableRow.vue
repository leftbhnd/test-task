<template>
  <tr>
    <td class="trow__checkbox">
      <input
        type="checkbox"
        :disabled="getNewUserState"
      />
    </td>
    <td class="trow__name">
      <input
        disabled="disabled"
        class="trow__label user-input"
        type="text"
        :value="user.name"
      />
    </td>
    <td class="trow__phone">
      <input
        disabled="disabled"
        class="trow__label user-input"
        type="text"
        :value="user.phone"
      />
    </td>
    <td class="trow__email">
      <input
        disabled="disabled"
        class="trow__label user-input"
        type="text"
        :value="user.email"
      />
    </td>
    <td class="trow__registration">
      <input
        disabled="disabled"
        class="trow__label user-input"
        type="text"
        :value="user.registration"
      />
    </td>
    <td class="trow__code">
      <input
        disabled="disabled"
        class="trow__label user-input"
        type="text"
        :value="user.code"
      />
    </td>
    <td class="trow__city">
      <input
        disabled="disabled"
        class="trow__label user-input"
        type="text"
        :value="user.city"
      />
    </td>
  </tr>
</template>

<script lang="ts">
import { mapGetters } from 'vuex'

export default {
  name: 'TableRow',
  props: {
    user: Object
  },
  computed: {
    ...mapGetters(['getNewUserState'])
  }
}
</script>
