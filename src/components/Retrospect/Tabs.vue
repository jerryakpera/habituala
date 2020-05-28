<template>
  <div>
    <q-tabs
      dense
      v-model="tab"
      class="text-dark"
      align="left"
    >
      <q-tab name="history" label="History" />
      <q-tab name="new" label="New" />
    </q-tabs>
    <q-tab-panels
      v-model="tab"
      animated
      swipeable
      vertical
      transition-prev="jump-up"
      transition-next="jump-up"
    >
      <q-tab-panel name="history">
        <history />
      </q-tab-panel>

      <q-tab-panel name="new">
        <!-- <div class="text-h4 q-mb-md">Account Settings</div> -->
        <addretrospect />
      </q-tab-panel>
      
    </q-tab-panels>
  </div>
</template>

<script>
export default {
  data: () => ({
    tab: 'history',
    splitterModel: 20
  }),
  components: {
    addretrospect: () => import("./NewRetrospect"),
    history: () => import("./History")
  }
}
</script>