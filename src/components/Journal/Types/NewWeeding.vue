<template>
  <div>
    <form
      @submit.prevent="submitForm"
    >
      <div class="row">
        <div class="col-6 q-pa-lg">
          <q-input 
            color="dark" 
            v-model="weedingJournal.problem" 
            label="identify the problem"
            dense
            ref="problem"
            :rules="[val => !!val || 'what problem?']"
            autofocus
            type="text"
          >
            <template v-slot:prepend>
              <q-icon 
                name="title" 
                size="xs"  
              />
            </template>
          </q-input>
        </div>
        <div class="col-6 q-pa-lg">
          <q-input 
            color="purple-12" 
            v-model="weedingJournal.date" 
            label="date"
            dense
            disable
          >
            <template v-slot:prepend>
              <q-icon 
                name="event" 
                size="xs"  
              />
            </template>
          </q-input>
        </div>
      </div>
      <div class="row">
        <div class="col-6 q-pa-lg">
          <q-input 
            color="purple-12"
            square
            outlined
            v-model="weedingJournal.objective" 
            label="what do you know about the problem"
            rows="4"
            type="textarea"
            ref="objective"
            :rules="[val => !!val || 'needs an entry']"
          />
        </div>
        <div class="col-6 q-pa-lg">
          <q-input 
            color="purple-12"
            square
            outlined
            v-model="weedingJournal.subjective" 
            label="how do you feel about the problem"
            rows="4"
            type="textarea"
            ref="subjective"
            :rules="[val => !!val || 'needs an entry']"
          />
        </div>
      </div>
      <div class="row">
        <div class="col q-pa-lg">
          <q-input 
            color="purple-12" 
            v-model="weedingJournal.entry" 
            label="now write about the problem as much as you want"
            square
            outlined
            rows="4"
            type="textarea"
            ref="entry"
            :rules="[val => !!val || 'needs an entry']"
          >
            <template v-slot:prepend>
              <q-icon 
                size="xs"
                name="description" 
              />
            </template>
          </q-input>
        </div>
      </div>
      <div class="row">
        <div class="col q-pa-lg">
          <q-btn 
            color="green-10" 
            label="Save"
            type="submit"
          />
          <q-btn 
            color="red-10" 
            label="Cancel"
            class="q-ml-md"
            @click="closeThisDialog"
          />
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  data: () => ({
    moreContent: true,
    drawer: false,
    drawerR: false,
    weedingJournal: {
      problem: "",
      objective: "",
      subjective: "",
      entry: "",
      date: new Date().toDateString()
    }
  }),
  methods: {
    ...mapActions("journal", ["addNewWeedingJournal"]),
    closeThisDialog() {
      this.$emit("closeDialog")
    },
    submitForm() {
      this.$refs.problem.validate()
      this.$refs.objective.validate()
      this.$refs.subjective.validate()
      this.$refs.entry.validate()

      if (!this.$refs.problem.hasError && !this.$refs.objective.hasError && !this.$refs.subjective.hasError && !this.$refs.entry.hasError) {
        this.submitWeedingJournal()
      }
    },
    submitWeedingJournal() {
      const newJournal = {
        type: "weeding",
        title: this.weedingJournal.problem,
        objective: this.weedingJournal.objective,
        subjective: this.weedingJournal.subjective,
        entry: this.weedingJournal.entry,
      }

      this.addNewWeedingJournal(newJournal)
      .then(response => {
        this.closeThisDialog()
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
}
</script>