<template>
  <div>
    <q-slide-item @left="onLeft" @right="onRight" left-color="green" right-color="red">
      <template v-slot:left>
        <q-icon name="done_all" />
      </template>
      <template v-slot:right>
        <q-icon name="delete" />
      </template>

      <q-item>
        <q-item-section>
      <q-item-label
        :class="group == 0 ? 'text-blue-10' : group == 1 ? 'text-orange-10' : 'text-green-10'"
      >
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
            class="bg-dark text-white"
          >
            <template v-slot:avatar>
              <!-- Display this if task is due in today -->
              <q-icon 
                size="sm"
                name="priority_high" 
                color="red" 
              />
            </template>
            <q-item-label
              class="row justify-end text-white"
            >
              {{task.dueDate}}
            </q-item-label>
            <q-item-label
              class="row justify-end text-white" 
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
    showEditTask: false
  }),
  methods: {
    ...mapActions("tasks", ["updateTask", "deleteTask"]),
    promptToDelete(id) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Really, delete?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.deleteTask(id)
      })
    },
    onLeft ({ reset }) {
      this.$q.notify('Left action triggered. Resetting in 1 second.')
      this.finalize(reset)
    },

    onRight ({ reset }) {
      this.$q.notify('Right action triggered. Resetting in 1 second.')
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
    }
  }
}
</script>

<style scoped>

</style>