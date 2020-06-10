<template>
  <q-page padding>
    <retrospecttabs />
  </q-page>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data: () => ({
    loading: false,
    retrospect: {
      date: new Date().toDateString(),
      title: "",
      rating: 0,
      goodthings: {
        one: "",
        two: "",
        three: ""
      },
      badthings: {
        one: "",
        two: "",
        three: ""
      },
      progress: {
        one: "",
        two: "",
        three: ""
      },
      quote: {
        text: "",
        author: ""
      },
      word: {
        word: "",
        definition: ""
      },
      journal: ""
    }
  }),
  components: {
    loading: () => import("../components/Shared/Loading"),
    snackbar: () => import("../components/Shared/Snackbar"),
    retrospecttabs: () => import("../components/Retrospect/Tabs")
  },
  methods: {
    ...mapActions("retrospect", ["addJournal", "addWord", "addQuote", "addProgress", "addBadThings", "addGoodThings", "addRetrospect"]),
    submitForm() {
      this.$refs.title.validate()
      this.$refs.goodthings.validate()
      this.$refs.badthings.validate()
      this.$refs.progress.validate()
      this.$refs.quotetext.validate()
      this.$refs.word.validate()
      this.$refs.definition.validate()
      this.$refs.journal.validate()
      
      if (!this.$refs.title.hasError && !this.$refs.goodthings.hasError && !this.$refs.badthings.hasError && !this.$refs.progress.hasError && !this.$refs.quotetext.hasError && !this.$refs.word.hasError && !this.$refs.definition.hasError && !this.$refs.journal.hasError) {
        this.submitRetrospectForm()
      }
    },
    submitRetrospectForm() {
      let retrospect = {}
      this.setLoading(true)
      this.addJournal(this.retrospect.journal)
      .then(journal => {
        if (!journal) retrospect.journal = ""
        else retrospect.journal = journal._id
        this.addWord(this.retrospect.word)
        .then(word => {
          if (!word) retrospect.word = ""
          else retrospect.word = word._id
          this.addQuote(this.retrospect.quote)
          .then(quote => {
            if (!quote) retrospect.quote = ""
            else retrospect.quote = quote._id
            this.addProgress(this.retrospect.progress)
            .then(progress => {
              if (!progress) retrospect.progress = ""
              else retrospect.progress = progress._id
              this.addBadThings(this.retrospect.badthings)
              .then(badthings => {
                if (!badthings) retrospect.badthings = ""
                else retrospect.badthings = badthings._id
                this.addGoodThings(this.retrospect.goodthings)
                .then(goodthings => {
                  if (!goodthings) retrospect.goodthings = ""
                  else retrospect.goodthings = goodthings._id
                  retrospect.rating = this.retrospect.rating
                  retrospect.title = this.retrospect.title
                  this.addRetrospect(retrospect)
                  .then((savedRetrospect) => {
                    this.setLoading(false)
                    this.$router.push("/")
                  })
                  .catch(err => {
                    console.log(3, err)
                    this.setLoading(false)
                  })
                })
                .catch(err => {
                  this.openSnackbar(err, "priority_high")
                  this.setLoading(false)
                })
              })
              .catch(err => {
                this.openSnackbar(err, "priority_high")
                this.setLoading(false)
              })
            })
            .catch(err => {
              this.openSnackbar(err, "priority_high")
              this.setLoading(false)
            })
          })
          .catch(err => {
            this.openSnackbar(err, "priority_high")
            this.setLoading(false)
          })
        })
        .catch(err => {
          this.openSnackbar(err, "priority_high")
          this.setLoading(false)
        })
      })
      .catch(err => {
        this.openSnackbar(err, "priority_high")
        this.setLoading(false)
      })
    },
    setLoading(val) {
      this.loading = val
    },
    openSnackbar(msg, icon) {
      const snackbar = {
        message: msg,
        icon
      }
      this.$root.$emit('showSnackbar', snackbar)
    },
  }
}
</script>

<style scoped>
  
</style>