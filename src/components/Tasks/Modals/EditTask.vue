<template>
  <q-card>
    <q-card-section
      class="row"
    >
      <modalheader>Edit task</modalheader>
      <q-space />
      <q-btn
        dense
        size="10px"
        round 
        flat
        icon="close"
        v-close-popup
      />
    </q-card-section>

    <form
      @submit.prevent="submitForm"
    >
      <q-card-section class="q-pt-none">
        <modaltaskname
          :name.sync="newTask.name"
          ref="modalTaskName"
        />

        <modalduedate
          :dueDate.sync="newTask.dueDate"
          @clearDate="clearDuedate"
        />

        <modalduetime
          :dueDate.sync="newTask.dueDate"
          :dueTime.sync="newTask.dueTime"
          @clearTime="clearDuetime"
        />
        
      </q-card-section>

      <modalbuttons />
    </form>
  </q-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data: () => ({
    showDate: false,
    newTask: {}
  }),
  props: ["task", "id"],
  components: {
    modalheader: () => import("./Shared/ModalHeader"),
    modaltaskname: () => import("./Shared/ModalTaskName"),
    modalduedate: () => import("./Shared/ModalDueDate"),
    modalduetime: () => import("./Shared/ModalDueTime"),
    modalbuttons: () => import("./Shared/ModalButtons")
  },
  methods: {
    ...mapActions("tasks", ["updateTask"]),
    submitForm() {
      this.$refs.modalTaskName.$refs.name.validate()

      if (!this.$refs.modalTaskName.$refs.name.hasError) {
        this.submitTask()
      }
    },
    submitTask() {
      this.updateTask({
        id: this.id,
        updates: this.newTask
      })
      this.$emit("closeAddTaskDialog")
    },
    clearDuedate() {
      this.newTask.dueDate = ""
      this.newTask.dueTime = ""
    },
    clearDuetime() {
      this.newTask.dueTime = ""
    },
  },
  mounted() {
    this.newTask = Object.assign({}, this.task)
  }
}
</script>

<style scoped>

</style>