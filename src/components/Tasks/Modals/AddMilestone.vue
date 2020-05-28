<template>
  <q-card
    style="width: 300px"
  >
    <q-card-section
      class="row"
    >
      <modalheader>Add Milestone</modalheader>
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
        <q-input 
          dense
          standout
          v-model="newMilestone.name"
          label="Name"
          :rules="[val => !!val || 'Name is missing']"
          ref="name"
          autofocus
        />
        
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          class="q-mr-sm"
          label="Save" 
          color="positive"
          type="submit"
        />
      </q-card-actions>
    </form>
  </q-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data: () => ({
    showDate: false,
    newMilestone: {
      name: "",
    }
  }),
  props: {
    group: {
      type: Number,
      required: true
    }
  },
  components: {
    modalheader: () => import("../../Shared/ModalHeader"),
    modalbuttons: () => import("./Shared/ModalButtons")
  },
  methods: {
    ...mapActions("milestones", ["addMilestone", "fetchMilestones"]),
    submitForm() {
      this.$refs.name.validate()

      if (!this.$refs.name.hasError) {
        const newMilestone = {
          name: this.newMilestone.name,
          group: this.group
        }
        this.submitMilestone(newMilestone)
      }
    },
    submitMilestone(newMilestone) {
      this.addMilestone(newMilestone)
      .then(() => {
        this.$root.$emit("fetchMilestones")
        this.$emit("closeDialog")
      })
      .catch(err => {
        console.log(err)
      })
    },
    clearMilestoneName() {
      this.newMilestone.dueTime = ""
    },
  }
}
</script>

<style scoped>

</style>