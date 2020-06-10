<template>
  <q-card
    style="width: 300px"
  >
    <q-card-section
      class="row"
    >
      <modalheader>Edit Milestone</modalheader>
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
          v-model="milestone.name"
          label="Name"
          :rules="[val => !!val || 'Name is required']"
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
  }),
  props: {
    milestone: {
      type: Object,
      required: true
    }
  },
  components: {
    modalheader: () => import("../../Shared/ModalHeader")
  },
  methods: {
    ...mapActions("milestones", ["editMilestone"]),
    submitForm() {
      this.$refs.name.validate()

      if (!this.$refs.name.hasError) {
        this.edit()
      }
    },
    edit(direction) {
      let milestone = {
        milestoneID: this.milestone._id,
        name: this.milestone.name,
        group: this.milestone.group
      }

      this.editMilestone(milestone)
      .then(returnedMilestone => {
        this.$root.$emit("fetchMilestones")
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>

</style>