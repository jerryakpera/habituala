<template>
  <q-page
    class="q-pa-xs"
  >
    <vocabtabs 
      :userVocabList="userWords"
      :words="words"
    />
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    vocabtabs: () => import("../components/Vocab/Tabs/VocabTabs")
  },
  computed: {
    ...mapGetters("retrospect", ["userWords", "words"]),
  },
  methods: {
    ...mapActions("retrospect", ["fetchUserWords", "fetchWords"]),
    getAllWords() {
      this.loading = true
      this.fetchUserWords()
      .then(() => {
        this.fetchWords()
        .then(() => {
          this.loading = false
        })
        .catch(err => {
          this.loading = false
          console.log(err)
        })
      })
      .catch(err => {
        this.loading = false
        console.log(err)
      })
    }
  },
  mounted() {
    this.getAllWords()
  }
}
</script>