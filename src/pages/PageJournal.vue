<template>
  <q-page padding>
    <div 
      class="row absolute-center"
      v-if="loading"
    >
      <loading />
    </div>
    <div 
      v-if="!loading"
      class="row q-mb-xs"
    >
      <journalcard
        v-for="journal in journaltypes"
        :key="journal.id"
        :journal="journal"
      />
    </div>
    <q-separator 
    />
    <div
      v-if="!loading"
      class="q-pt-sm"
    >
      <q-banner
        inline-actions
        class="text-white bg-negative"
        v-if="userJournals.journals.length == 0"
      >
        You have no journals.
      </q-banner>
      <journals
        v-else
        :journals="userJournals.journals"
      />
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

const generateCells = () => Array(24).fill(null).map((_, cell) => (
  Array(2 + Math.ceil(3 * Math.random())).fill(null).map((_, text) => `Cell ${cell + 1} - ${text + 1}`)
))
export default {
  data: () => ({
    loading: false,
    journaltypes: [
      {
        id: "01",
        title: "open",
        description: "an open journal format for thoughts and notes",
        count: 8,
        color: "grey"
      },
      {
        id: "02",
        title: "weeding",
        description: "a journal format to uproot problems",
        count: 5,
        color: "blue"
      },
      {
        id: "03",
        title: "reflection",
        description: "a reflective journal format for retrospection",
        count: 1,
        color: "red"
      },
    ]
  }),
  components: {
    journalcard: () => import("../Components/Journal/JournalCard"),
    journal: () => import("../Components/Journal/Journal"),
    journals: () => import("../Components/Journal/Journals"),
    loading: () => import("../components/Shared/Loading")
  },
  computed: {
    ...mapGetters("journal", ["userJournals"]),
    openJournalCount() {
      return this.userJournals.journals.filter(journal => journal.type === "open").length
    }
  },
  methods: {
    ...mapActions("journal", ["fetchUserJournals"]),
    getUserJournals() {
      this.loading = true
      this.fetchUserJournals()
      .then(() => {
        this.journaltypes.forEach(journalType => {
          this.journaltypes[0].count = this.userJournals.journals.filter(journal => journal.type === "open").length
          this.journaltypes[1].count = this.userJournals.journals.filter(journal => journal.type === "weeding").length
          this.journaltypes[2].count = this.userJournals.journals.filter(journal => journal.type === "reflection").length
        })
        this.loading = false
      })
      .catch(err => {
        this.loading = false
      })
    },
    addJournalCount(journalType) {
      if (journalType == "open") this.journaltypes[0].count ++
      if (journalType == "weeding") this.journaltypes[1].count ++
      if (journalType == "reflection") this.journaltypes[2].count ++
    }
  },
  created() {
    this.getUserJournals()
    this.$root.$on("newJournalAdded", journalType => {
      this.addJournalCount(journalType)
    })
  }
}
</script>