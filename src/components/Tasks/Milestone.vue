<template>
  <div v-if="milestone">
    <q-card-section
      :componentKey="componentKey"
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
            stripe
            size="8px" 
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
                :milestoneID="milestone._id"
                @removeTask="removeTaskFromMilestone"
                @refreshMilestone="refreshEditedTask"
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
              @click="promptToDelete"
              class="q-ml-sm"
            />
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-card-section>
    
    <q-dialog v-model="showAddTask">
      <addtask 
        :milestoneID="milestone._id" 
        @closeDialog="showAddTask = false" 
        @addNewTask="addNewTaskToMilestone"  
      />
    </q-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data: () => ({
    componentKey: 0,
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
      const completed = this.milestone.tasks.filter(task => task.completed).length
      const total = this.milestone.tasks.length

      if (total === 0) {
        return 0
      } else {
        return Number((completed / total).toFixed(1))
      }
    }
  },
  methods: {
    ...mapActions("milestones", ["deleteMilestone"]),
    promptToDelete(id) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Really, delete?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.removeMilestone(this.milestone._id)
      })
    },
    removeMilestone() {
      this.deleteMilestone(this.milestone._id)
      .then(() => {
        this.$root.$emit("fetchMilestones")
      })
      .catch(err => {
        console.log(err)
      })
    },
    refreshEditedTask(editedTask) {
      const tasks = []

      this.milestone.tasks.forEach(task => {
        if (task._id != editedTask._id) tasks.push(task)
        else tasks.push(editedTask)
      })

      this.milestone.tasks = tasks
      
      this.componentKey++
    },
    addNewTaskToMilestone(newTask) {
      this.milestone.tasks.push(newTask)
    },
    removeTaskFromMilestone(taskID) {
      const index = this.milestone.tasks.findIndex(task => {
        return taskID == task._id
      })

      this.milestone.tasks.splice(index, 1)
      this.componentKey++
    }
  },
  mounted() {
    this.$root.$on("refreshTask", editedTask => {
      this.refreshEditedTask(editedTask)
    })
  }
}
</script>