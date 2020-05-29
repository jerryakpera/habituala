<template>
  <div
    :componentKey="componentKey"
  >
    <q-slide-item 
      @left="onLeft" 
      @right="onRight" 
      left-color="green"
      right-color="red"
    >
      <q-tooltip :delay="1500" :offset="[0, 10]">Slide task to complete / delete</q-tooltip>
      <template v-slot:left>
        <q-icon 
          name="done_all"
          size="xs"
        />
      </template>
      <template v-slot:right>
        <q-icon 
          name="delete" 
          size="xs"
        />
      </template>

      <q-item>
        <q-item-section 
          side
          top
          class="q-ml-none"
        >
          <q-icon
            v-if="!task.completed"
            class="q-mt-sm"
            name="check_box_outline_blank"
            size="xs"
          />
          <q-icon
            v-if="task.completed"
            class="q-mt-sm"
            name="check_box"
            size="xs"
            color="positive"
          />
        </q-item-section>
        <q-item-section>
          <q-item-label
            :class="group == 0 ? 'text-blue-10' : group == 1 ? 'text-orange-10' : 'text-green-10'"
          >
            <q-icon
              v-if="task.remainingDays && task.remainingDays <= 3"
              size="xs"
              name="priority_high" 
              :color="task.remainingDays <= 1 ? 'red' : task.remainingDays <= 2 ? 'orange-5' : 'orange'" 
            />
            {{task.name}}
          </q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-btn 
            round
            outline
            color="dark" 
            icon="event"
            v-if="task.dueDate"  
            size="xs"
          >
            <q-popup-proxy
              class="q-mt-sm"
            >
              <q-banner
                class="bg-dark text-white q-pa-sm"
              >
                <q-item-label
                  class="text-white"
                >
                  {{task.dueDate}}
                </q-item-label>
                <q-item-label
                  class="text-white" 
                >
                  {{task.dueTime}}
                </q-item-label>
              </q-banner>
            </q-popup-proxy>
          </q-btn>
        </q-item-section>

        <q-item-section side>
          <div class="row">
            <q-btn 
              dense
              flat 
              round
              size="xs"
              :color="group == 0 ? 'blue' : group == 1 ? 'orange' : 'green'"
              icon="edit"
              @click.stop="showEditTask = true"
            />
          </div>
        </q-item-section>
      </q-item>
    </q-slide-item>

    <q-dialog v-model="showEditTask">
      <edittask
        :task="task"
        :id="id"
        @closeAddTaskDialog="showEditTask = false"
      />
    </q-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data: () => ({
    componentKey: 0,
    showEditTask: false
  }),
  methods: {
    ...mapActions("milestones", ["deleteTask", "updateTask"]),

    promptToDelete(deleteTask) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Really, delete?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.deleteTask(deleteTask)
        .then(() => {
          this.$emit("removeTask", deleteTask.taskID)
        })
      })
    },

    onLeft ({ reset }) {
      const taskToEdit = {
        _id: this.task._id,
        name: this.task.name,
        completed: true,
        user: this.task.user,
        dueDate: this.task.dueDate,
        dueTime: this.task.dueTime
      }

      this.updateTask(taskToEdit)
      .then(editedTask => {
        this.$emit("refreshMilestone", editedTask)
      })
      .catch(err => {
        console.log(err)
      })
      this.finalize(reset)
    },

    onRight ({ reset }) {
      const deleteTask = {
        milestoneID: this.milestoneID,
        taskID: this.task._id
      }
      this.promptToDelete(deleteTask)
      this.finalize(reset)
    },

    finalize (reset) {
      this.timer = setTimeout(() => {
        reset()
      }, 1000)
    }
  },
  components: {
    edittask: () => import("./Modals/EditTask.vue")
  },
  props: {
    task: {
      type: Object,
      required: true
    },
    group: {
      type: Number,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    milestoneID: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>

</style>