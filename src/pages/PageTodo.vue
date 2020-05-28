<template>
  <q-page class="">
    <div 
      class="row absolute-center"
      v-if="loading"  
    >
      <loading />
    </div>
    <div
      v-else
      class="row"
    >
      <div
        v-for="group in groups"
        :key="group.group"
        class="col-4 q-pa-sm"
      >
        <group 
          :group="group"
          :milestones="milestones[group.group]"
        />
      </div>
    </div>
    <!-- <notasks v-if="Object.keys(tasksTodo).length < 1" />
    <taskstodo :tasks="tasksTodo" title="Tasks Todo" color="red" v-else />

    <taskstodo
      class="q-mt-lg"
      :tasks="tasksCompleted"
      title="Tasks Completed"
      color="blue"
      v-if="Object.keys(tasksCompleted).length > 0"
    /> -->

  </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import _ from "../services/utils/utils";

export default {
  data: () => ({
    loading: false,
    showAddTask: false,
    showAddMilestone: false,
    groups: [
      {
        group: 0,
        name: "Todo",
        color: "blue"
      },
      {
        group: 1,
        name: "In Progress",
        color: "orange"
      },
      {
        group: 2,
        name: "Completed",
        color: "green"
      },
    ]
  }),
  components: {
    group: () => import("../components/Tasks/Group.vue"),
    loading: () => import("../components/Shared/Loading.vue")
  },
  computed: {
    ...mapGetters("tasks", ["tasksTodo", "tasksCompleted"]),
    ...mapGetters("milestones", ["milestones"])
  },
  methods: {
    ...mapActions("milestones", ["fetchMilestones"]),
    getMilestones() {
      this.loading = true
      this.fetchMilestones()
      .then(() => {
        this.loading = false
      })
      .catch(err => {
        this.loading = false
      })
    }
  },
  mounted() {
    this.$root.$on("addNewTask", () => {
      this.showAddTask = true;
    });
    this.$root.$on("fetchMilestones", () => {
      this.getMilestones()
    });
    this.getMilestones()
  }
};
</script>

<style scoped></style>
