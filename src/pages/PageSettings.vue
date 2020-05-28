<template>
  <q-page padding>
    <!-- <p>Settings</p> -->
    <settingstabs />
  </q-page>
</template>

<script>
export default {
  data: () => ({
    
  }),
  components: {
    settingstabs: () => import("../components/Settings/Tabs")
  },
  methods: {
    
  }
}
</script>

<style scoped>
  
</style>