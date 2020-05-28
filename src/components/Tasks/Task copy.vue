<template>
  <q-item
    v-ripple
    clickable
    @click="updateTask({id, updates: {completed: !task.completed}})"
    :class="task.completed ? 'bg-blue-1' : 'bg-orange-1'"
  >
    <q-item-section side top>
      <q-checkbox 
        v-model="task.completed"
      />
    </q-item-section>

    <q-item-section>
      <q-item-label
        :class="task.completed ? 'text-strike' : ''"
      >
        {{task.name}}
      </q-item-label>
    </q-item-section>

    <q-item-section side>
      <div class="row">
        <div class="column justify-center">
          <q-icon
            class="q-mr-xs"
            size="18px"
            name="event" 
            v-if="task.dueDate"  
          />
        </div>
        <div class="column">
          <q-item-label 
            caption
            class="row justify-end"  
          >
            {{task.dueDate}}
          </q-item-label>
          <q-item-label 
            caption
            class="row justify-end"  
          >
            <small>{{task.dueTime}}</small>
          </q-item-label>
        </div>
      </div>
    </q-item-section>
    <q-item-section side>
      <div class="row">
        <q-btn 
          dense
          flat 
          round 
          color="blue" 
          icon="edit"
          @click.stop="showEditTask = true"
        />
        <q-btn 
          dense
          flat 
          round 
          color="red" 
          icon="delete"
          @click.stop="promptToDelete(id)"
        />
      </div>
    </q-item-section>

    <q-dialog v-model="showEditTask">
      <edittask
        :task="task"
        :id="id"
        @closeAddTaskDialog="showEditTask = false"
      />
    </q-dialog>
  </q-item>
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
    id: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>

</style>