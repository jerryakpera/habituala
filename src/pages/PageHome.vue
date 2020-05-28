<template>
  <h4>{{user}}</h4>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("auth", ["user"])
  }
}
</script>