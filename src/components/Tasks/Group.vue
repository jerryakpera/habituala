<template>
  <q-card
    flat
    square
  >
    <q-toolbar 
      :class="'bg-' + group.color + '-10'"
      class="text-white"
    >
      <div class="text-h6 text-white">
        {{group.name}}
      </div>
      <q-space />
      <q-btn 
        v-if="group.group < 2"
        flat 
        round 
        dense 
        icon="add"
        @click="showAddMilestone = true"
      />
    </q-toolbar>

    <milestone
      v-for="(milestone, key) in milestones"
      :key="key"
      :milestone="milestone"
      :color="group.color"
      class="q-pa-xs"
    />
    
    <q-dialog v-model="showAddMilestone">
      <addmilestone 
        :group="group.group"
        @closeDialog="showAddMilestone = false" />
    </q-dialog>
  </q-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data: () => ({
    showAddMilestone: false
  }),
  props: {
    group: {
      type: Object,
      required: true
    },
    milestones: {
      type: Array
    }
  },
  components: {
    milestone: () => import("./Milestone"),
    addmilestone: () => import("./Modals/AddMilestone.vue")
  }
}
</script>