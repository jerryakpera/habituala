<template>
  <div>
    <q-splitter
      v-model="splitterModel"
    >

      <template v-slot:before>
        <q-tabs
          dense
          v-model="tab"
          vertical
          class="text-teal"
          shrink
        >
          <q-tab name="account" label="Account" />
        </q-tabs>
      </template>

      <template v-slot:after>
        <q-tab-panels
          v-model="tab"
          animated
          swipeable
          vertical
          transition-prev="jump-up"
          transition-next="jump-up"
        >
          <q-tab-panel name="account">
            <!-- <div class="text-h4 q-mb-md">Account Settings</div> -->
            <accountsettings />
          </q-tab-panel>
          
        </q-tab-panels>
      </template>

    </q-splitter>
  </div>
</template>

<script>
export default {
  data: () => ({
    tab: 'account',
    splitterModel: 20
  }),
  components: {
    accountsettings: () => import("./tabs/AccountSettings")
  }
}
</script>