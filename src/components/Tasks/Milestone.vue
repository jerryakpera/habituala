<template>
  <div v-if="milestone">
    <q-card-section
      :class="milestone.group == 0 ? 'bg-blue-8' : milestone.group == 1 ? 'bg-orange-8' : 'bg-green-8'"
      class="q-pa-none"
    >
      <q-expansion-item
        :label="milestone.name"
        class="text-white"
        expand-icon-class="text-white"
      >
        <q-card>
          <q-linear-progress 
            size="10px" 
            :value="progress"
            :color="progress <= 0.3 ? 'red' : progress <= 0.6 ? 'blue' : 'green'"  
          />
          <q-card-section
            class="q-pa-none"
          >
            <q-list>
              <task 
                v-for="task in milestone.tasks"
                :key="task.id"
                :task="task"
                :id="task._id"
                :group="milestone.group"
              />
            </q-list>
          </q-card-section>
          <q-card-section>
            <q-btn
              dense
              size="10px"
              round
              :color="milestone.group == 0 ? 'blue-8' : milestone.group == 1 ? 'orange-8' : 'green-8'"
              icon="add"
              @click="showAddTask = true"
            />

            <q-btn
              dense
              size="10px"
              round
              color="red"
              icon="delete"
              @click="removeMilestone"
              class="q-ml-sm"
            />
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-card-section>
    
    <q-dialog v-model="showAddTask">
      <addtask 
        :milestoneID="milestone._id" 
        @closeAddTaskDialog="showAddTask = false" />
    </q-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data: () => ({
    showAddTask: false
  }),
  props: {
    milestone: {
      type: Object,
      required: true
    },
    color: {
      type: String,
      required: true
    }
  },
  components: {
    addtask: () => import("./Modals/AddTask"),
    task: () => import("./Task"),
  },
  computed: {
    progress() {
      return Number((this.milestone.completedTasks / this.milestone.totalTasks).toFixed(1))
    }
  },
  methods: {
    ...mapActions("milestones", ["deleteMilestone"]),
    removeMilestone() {
      this.deleteMilestone(this.milestone._id)
    }
  }
}
</script>