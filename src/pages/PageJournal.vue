<template>
  <q-page padding>
    <div class="row">
      <journalcard
        v-for="journal in journaltypes"
        :key="journal.id"
        :journal="journal"
      />
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data: () => ({
    journaltypes: [
      {
        id: "01",
        title: "open",
        description: "did you know that writing down your thoughts improves decision making",
        count: 8,
        color: "grey"
      },
      {
        id: "02",
        title: "weeding",
        description: "journaling about a problem is like grabbing it by the root and remove it",
        count: 5,
        color: "blue"
      },
      {
        id: "03",
        title: "reflection",
        description: "sometimes you must look back to improve or celebrate",
        count: 1,
        color: "red"
      },
    ]
  }),
  components: {
    journalcard: () => import("../Components/Journal/JournalCard")
  },
  computed: {
    ...mapGetters("journal", ["userJournals"])
  }
}
</script>

<style scoped>
  
</style>