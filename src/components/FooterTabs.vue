<template>
  <q-route-tab
    exact
    :to="tab.link"
    :icon="tab.icon" 
    :label="tab.title" 
  />
</template>

<script>
export default {
  name: 'EssentialLink',
  props: {
    tab: {
      type: Object,
      required: true
    }
  }
}
</script>
