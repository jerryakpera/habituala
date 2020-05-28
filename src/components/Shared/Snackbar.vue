<template>
  <div class="q-pa-md">
  </div>
</template>

<script>
export default {
  computed: {
  },
  methods: {
    showNotif (snackbar) {
      this.$q.notify(snackbar)
    }
  },
  mounted() {
    this.$root.$on("showSnackbar", (snackbar) => {
      console.log(snackbar)
      this.showNotif(snackbar)
    })
  }
}
</script>