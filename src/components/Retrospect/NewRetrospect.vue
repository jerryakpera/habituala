<template>
  <q-page>
    <div class="row absolute-center">
      <loading v-if="loading" />
    </div>
    <form v-if="!loading" @submit.prevent="submitForm">
      <q-card 
        class="my-card" 
        flat 
        bordered>
        <q-card-actions class="q-mt-lg align-right">
          <q-btn 
            flat 
            color="dark"
            type="submit"
          >
            Submit
          </q-btn>
        </q-card-actions>
        <q-separator />
        <q-card-section 
          horizontal
        >
          <q-card-section 
            class="col-4"
          >
            <q-input 
              color="purple-12" 
              v-model="retrospect.date" 
              label="Date"
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
          </q-card-section>

          <q-card-section class="col-8">
            <q-input 
              color="dark" 
              v-model="retrospect.title" 
              label="Title"
              dense
              ref="title"
              :rules="[val => !!val || 'Title is missing']"
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
          </q-card-section>

        </q-card-section>

        <q-card-section class="q-mt-lg">
          <span>Rating</span>
          <div>
            <q-rating
              v-model="retrospect.rating"
              size="1.5em"
              :max="5"
              color="secondary"
            />
          </div>
        </q-card-section>

        <q-card-section horizontal class="q-mt-lg">
          <q-card-section class="col-4">
            <q-input 
              color="purple-12" 
              v-model="retrospect.goodthings.one" 
              label="The Good Things"
              dense
              type="text"
              :rules="[val => !!val || 'Give us one good thing']"
              ref="goodthings"
            >
              <template v-slot:prepend>
                <q-icon 
                  size="xs"
                  name="thumb_up_alt" 
                />
              </template>
            </q-input>
            <q-input 
              color="purple-12" 
              v-model="retrospect.goodthings.two" 
              dense
            />
            <q-input 
              color="purple-12" 
              v-model="retrospect.goodthings.three" 
              dense
            />
          </q-card-section>

          <q-card-section class="col-4">
            <q-input 
              color="purple-12" 
              v-model="retrospect.badthings.one" 
              label="The Negatives"
              dense
              ref="badthings"
              :rules="[val => !!val || 'One thing youll like to improve on']"
            >
              <template v-slot:prepend>
                <q-icon 
                  size="xs"
                  name="thumb_down_alt" 
                />
              </template>
            </q-input>
            <q-input 
              color="purple-12" 
              v-model="retrospect.badthings.two" 
              dense
            />
            <q-input 
              color="purple-12" 
              v-model="retrospect.badthings.three" 
              dense
            />
          </q-card-section>

          <q-card-section class="col-4">
            <q-input 
              color="purple-12" 
              v-model="retrospect.progress.one" 
              label="Progress I made"
              dense
              ref="progress"
              :rules="[val => !!val || 'One thing you made progress with']"
            >
              <template v-slot:prepend>
                <q-icon 
                  size="xs"
                  name="trending_up" 
                />
              </template>
            </q-input>
            <q-input 
              color="purple-12" 
              v-model="retrospect.progress.two" 
              dense
            />
            <q-input 
              color="purple-12" 
              v-model="retrospect.progress.three" 
              dense
            />
          </q-card-section>

        </q-card-section>

        <q-card-section horizontal class="q-mt-lg">
          <q-card-section class="col-4">
            <q-input 
              color="purple-12" 
              v-model="retrospect.quote.text" 
              label="Quote of the day"
              dense
              rows="4"
              type="textarea"
              :rules="[val => !!val || 'Quote cannot be empty']"
              ref="quotetext"
            >
              <template v-slot:prepend>
                <q-icon 
                  size="xs"
                  name="book" 
                />
              </template>
            </q-input>
            <q-input 
              color="purple-12" 
              label="Author"
              v-model="retrospect.quote.author" 
              dense
              ref="quoteauthor"
            >
              <template v-slot:prepend>
                <q-icon 
                  size="xs"
                  name="face" 
                />
              </template>
            </q-input>
          </q-card-section>

          <q-card-section class="col-4">
            <q-input 
              color="purple-12" 
              v-model="retrospect.word.definition" 
              label="Definition"
              dense
              rows="4"
              type="textarea"
              :rules="[val => !!val || 'Definition is required']"
              ref="definition"
            >
              <template v-slot:prepend>
                <q-icon 
                  size="xs"
                  name="spellcheck" 
                />
              </template>
            </q-input>
            <q-input 
              color="purple-12" 
              label="Word of the day"
              v-model="retrospect.word.word" 
              dense
              :rules="[val => !!val || 'Word is required']"
              ref="word"
            >
              <template v-slot:prepend>
                <q-icon 
                  size="xs"
                  name="chrome_reader_mode" 
                />
              </template>
            </q-input>
          </q-card-section>

        </q-card-section>

        <q-card-section class="q-mt-lg">
          <q-input 
            color="purple-12" 
            v-model="retrospect.journal" 
            label="Journal"
            dense
            rows="4"
            type="textarea"
            ref="journal"
            :rules="[val => !!val || 'Write a journal']"
          >
            <template v-slot:prepend>
              <q-icon 
                size="xs"
                name="description" 
              />
            </template>
          </q-input>
        </q-card-section>

        <q-separator />

        <q-card-actions class="q-mt-lg">
          <q-btn 
            flat 
            color="dark"
            type="submit"
          >
            Submit
          </q-btn>
        </q-card-actions>
      </q-card>
    </form>
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
    loading: () => import("../Shared/Loading"),
    snackbar: () => import("../Shared/Snackbar")
  },
  methods: {
    ...mapActions("retrospect", ["addJournal", "addWord", "addQuote", "addProgress", "addBadThings", "addGoodThings", "addRetrospect", "fetchUserRetrospects"]),
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
                    const snackbar = {
                      message: "Retrospect saved",
                      icon: "done_all"
                    }
                    this.openSnackbar(snackbar)
                    this.setLoading(false)
                    this.$router.push("/")
                  })
                  .catch(err => {
                    const snackbar = {
                      message: err,
                      icon: "priority_high"
                    }
                    this.openSnackbar(snackbar)
                    this.setLoading(false)
                  })
                })
                .catch(err => {
                  const snackbar = {
                    message: err,
                    icon: "priority_high"
                  }
                  this.openSnackbar(snackbar)
                  
                  this.setLoading(false)
                })
              })
              .catch(err => {
                const snackbar = {
                  message: err,
                  icon: "priority_high"
                }
                this.openSnackbar(snackbar)
                this.setLoading(false)
              })
            })
            .catch(err => {
              const snackbar = {
                message: err,
                icon: "priority_high"
              }
              this.openSnackbar(snackbar)
              this.setLoading(false)
            })
          })
          .catch(err => {
            const snackbar = {
              message: err,
              icon: "priority_high"
            }
            this.openSnackbar(snackbar)
            this.setLoading(false)
          })
        })
        .catch(err => {
          const snackbar = {
            message: err,
            icon: "priority_high"
          }
          this.openSnackbar(snackbar)
          this.setLoading(false)
        })
      })
      .catch(err => {
        const snackbar = {
          message: err,
          icon: "priority_high"
        }
        this.openSnackbar(snackbar)
        this.setLoading(false)
      })
    },
    setLoading(val) {
      this.loading = val
    },
    openSnackbar(snackbar) {
      this.$root.$emit('showSnackbar', snackbar)
    },
  }
}
</script>

<style scoped>
  
</style>