<template>
  <div v-if="milestone">
    <q-card-section
      :componentKey="componentKey"
      :class="milestone.group == 0 ? 'bg-blue-8' : milestone.group == 1 ? 'bg-orange-8' : 'bg-green-8'"
      class="q-pa-none q-mt-sm"
      style="border-radius: 30px"
    >
      <q-expansion-item
        :label="milestone.name"
        class="text-white"
        expand-icon-class="text-white"
        dense-toggle
      >
        <template v-slot:header>
          <q-item-section avatar>
            <q-badge 
              color="white"
              text-color="black"
              :label="milestone.tasks.length" 
            />
          </q-item-section>

          <q-item-section>
            {{milestone.name}}
          </q-item-section>
        </template>
        <q-card
          bordered
        >
          <q-linear-progress
            stripe
            size="8px" 
            :value="progress"
            :color="progress <= 0.3 ? 'red' : progress <= 0.6 ? 'blue' : 'green'"  
          />
          <q-card-section 
            horizontal 
            class="q-pa-none q-ma-none q-mt-xs q-mb-sm"
          >

            <q-card-section 
              class="q-pa-none q-ma-none col-2"
            >
              <q-btn
                v-if="milestone.group != 0"
                dense
                size="10px"
                color="blue"
                icon="arrow_left"
                unelevated
                @click="moveMilestone('left')"
                class="q-ml-sm"
              />
            </q-card-section>

            <q-card-section 
              class="q-pa-none q-ma-none col-8"
            ></q-card-section>
            <q-card-section 
              class="q-pa-none q-ml-lg col-1"
            >
              <q-btn
                v-if="milestone.group != 2"
                dense
                size="10px"
                color="blue"
                icon-right="arrow_right"
                unelevated
                @click="moveMilestone('right')"
              />
            </q-card-section>
          </q-card-section>

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
              color="green"
              icon="add"
              unelevated
              @click="showAddTask = true"
            />

            <q-btn
              dense
              size="10px"
              round
              color="blue-grey"
              unelevated
              icon="edit"
              class="q-ml-sm"
              @click="editMilestoneDialog = true"
            />

            <q-btn
              dense
              size="10px"
              round
              color="red"
              unelevated
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
    
    <q-dialog v-model="editMilestoneDialog">
      <editmilestone 
        :milestone="milestone" 
      />
    </q-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data: () => ({
    componentKey: 0,
    showAddTask: false,
    editMilestoneDialog: false
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
    editmilestone: () => import("./Modals/EditMilestone"),
    addtask: () => import("./Modals/AddTask"),
    task: () => import("./Task")
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
    ...mapActions("milestones", ["deleteMilestone", "editMilestone", "changeMilestoneGroup"]),
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
    },
    moveMilestone(direction) {
      let milestone = {
        milestoneID: this.milestone._id,
        name: this.milestone.name,
        group: this.milestone.group
      }

      if (direction === 'left') {
        milestone.group = this.milestone.group - 1
      } else {
        milestone.group = this.milestone.group + 1
      }

      this.editMilestone(milestone)
      .then(returnedMilestone => {
        this.$root.$emit("fetchMilestones")
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  mounted() {
    this.$root.$on("refreshTask", editedTask => {
      this.refreshEditedTask(editedTask)
    })
  }
}
</script>