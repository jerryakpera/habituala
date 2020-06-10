<template>
  <div class="col-4 q-pa-xs">
    <q-card 
      class="my-card cursor-pointer"
      :class="'bg-' + journal.color + '-10'"
      square
      dark
      color="bg-primary"
      @click="showJournalDialog = true"
    >
      <q-badge 
        color="white" 
        text-color="black" 
        :label="journal.count"
      />
      <q-card-section>
        <div class="text-h6 text-white">
          {{journal.title}}
        </div>
        <div 
          class="text-subtitle2 text-grey-3"
        >
          {{journal.description}}
        </div>
      </q-card-section>
    </q-card>
    <q-dialog 
      v-model="showJournalDialog"
      transition-show="slide-up"
      maximized
      transition-hide="slide-down"
    >
      <journaldialog
        :journal="journal"
        @closeDialog="showJournalDialog = false"
      />
    </q-dialog>
  </div>
</template>

<script>
export default {
  data: () => ({
    showJournalDialog: false,
  }),
  props: {
    journal: {
      type: Object,
      required: true
    }
  },
  components: {
    journaldialog: () => import("./JournalDialog")
  }
}
</script>