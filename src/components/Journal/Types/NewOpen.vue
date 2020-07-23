<template>
  <div>
    <form
      @submit.prevent="submitForm"
    >
      <div class="row">
        <div class="col-12 col-md-6 q-pa-sm">
          <q-input 
            color="dark" 
            v-model="openJournal.title" 
            label="journal title"
            dense
            ref="title"
            :rules="[val => !!val || 'what title?']"
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
        <div class="col-12 col-md-6 q-pa-sm">
          <q-input 
            color="purple-12" 
            v-model="openJournal.date" 
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
        <div class="col q-pa-sm">
          <q-input 
            color="purple-12" 
            v-model="openJournal.entry" 
            label="journal entry"
            square
            outlined
            rows="10"
            type="textarea"
            ref="entry"
            :rules="[val => !!val || 'journal needs an entry']"
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
    openJournal: {
      title: "",
      entry: "",
      date: new Date().toDateString()
    }
  }),
  methods: {
    ...mapActions("journal", ["addNewJournal"]),
    closeThisDialog() {
      this.$emit("closeDialog")
    },
    submitForm() {
      this.$refs.title.validate()
      this.$refs.entry.validate()

      if (!this.$refs.title.hasError && !this.$refs.entry.hasError) {
        this.submitOpenJournal()
      }
    },
    submitOpenJournal() {
      const newJournal = {
        title: this.openJournal.title,
        entry: this.openJournal.entry,
        type: "open"
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