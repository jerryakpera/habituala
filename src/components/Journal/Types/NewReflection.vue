<template>
  <div>
    <form
      @submit.prevent="submitForm"
    >
      <div class="row">
        <div class="col-12 col-md-6 q-pa-sm">
          <q-input 
            color="dark" 
            v-model="reflectionJournal.title" 
            label="what are you reflecting on today"
            dense
            ref="title"
            :rules="[val => !!val || 'reflecting on?']"
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
        <div class="col-12 col-md-2 q-pa-sm">
          <span>Give it a rating</span>
          <div class="q-mb-md">
            <q-rating
              v-model="reflectionJournal.rating"
              size="1.5em"
              :max="5"
              color="yellow"
            />
          </div>
        </div>
        <div class="col-12 col-md-4 q-pa-sm">
          <q-input 
            color="purple-12" 
            v-model="reflectionJournal.date" 
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
        <div class="col-12 col-md-6 q-pa-sm">
          <q-input 
            color="purple-12"
            square
            outlined
            v-model="reflectionJournal.goodthings" 
            label="In hindsight, what things did you do well"
            rows="4"
            type="textarea"
            ref="goodthings"
          />
        </div>
        <div class="col-12 col-md-6 q-pa-sm">
          <q-input 
            color="purple-12"
            square
            outlined
            v-model="reflectionJournal.badthings" 
            label="In hindsight, what things can you improve on"
            rows="4"
            type="textarea"
            ref="badthings"
          />
        </div>
      </div>
      <div class="row">
        <div class="col q-pa-sm">
          <q-input 
            color="purple-12" 
            v-model="reflectionJournal.entry" 
            label="this space is for reflection"
            square
            outlined
            rows="4"
            type="textarea"
            ref="entry"
            :rules="[val => !!val || 'needs an entry']"
          />
        </div>
      </div>
      <div class="row">
        <div class="col q-pa-sm">
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
    reflectionJournal: {
      title: "",
      goodthings: "",
      badthings: "",
      rating: 0,
      date: new Date().toDateString(),
      entry: ""
    }
  }),
  methods: {
    ...mapActions("journal", ["addNewJournal"]),
    closeThisDialog() {
      this.$emit("closeDialog")
    },
    submitForm() {
      this.$refs.title.validate()
      this.$refs.goodthings.validate()
      this.$refs.badthings.validate()
      this.$refs.entry.validate()

      if (!this.$refs.title.hasError && !this.$refs.goodthings.hasError && !this.$refs.badthings.hasError && !this.$refs.entry.hasError) {
        this.submitReflectionJournal()
      }
    },
    submitReflectionJournal() {
      const newJournal = {
        type: "reflection",
        title: this.reflectionJournal.title,
        goodthings: this.reflectionJournal.goodthings,
        badthings: this.reflectionJournal.badthings,
        rating: this.reflectionJournal.rating,
        entry: this.reflectionJournal.entry,
      }

      this.addNewJournal(newJournal)
      .then(response => {
        this.$root.$emit("newJournalAdded", newJournal.type)
        this.closeThisDialog()
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
}
</script>