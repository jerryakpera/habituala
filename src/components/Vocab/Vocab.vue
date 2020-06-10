<template>
  <q-slide-item 
    @left="onLeft" 
    @right="onRight"
    right-color="red"
    left-color="positive"
  >
    <q-tooltip 
      :delay="1500" 
      :offset="[0, 10]"
      v-if="listName == 'My List'"
    >
      Slide left remove
    </q-tooltip>
    <q-tooltip 
      :delay="1500" 
      :offset="[0, 10]"
      v-else
    >
      Slide right to add to your list
    </q-tooltip>
    <template 
      v-if="listName == 'All'"
      v-slot:left
    >
      <q-icon 
        name="add"
      />
    </template>
    <template 
      v-if="listName == 'My List'"
      v-slot:right
    >
      <q-icon 
        name="remove" 
      />
    </template>
    <template 
      v-if="listName == 'All'"
      v-slot:left
    >
      <q-icon 
        name="add"
      />
    </template>
    <template 
      v-else-if="listName == 'game'"
      v-slot:right
    >
      <q-icon name="remove" />
    </template>

    <q-item>
      <q-item-section>
        <q-item-label
          class="text-h5"
        >
          {{vocab.word}}
        </q-item-label>
        <q-item-label
          class="text-subtitle1"
        >
          {{vocab.definition}}
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-slide-item>

</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: {
    vocab: {
      type: Object,
      required: true
    },
    listName: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters("retrospect", ["userWords"]),
  },
  methods: {
    ...mapActions("retrospect", ["addVocabToUserList", "removeVocabFromUser"]),

    onLeft ({ reset }) {
      this.addWordFromList()
      this.finalize(reset)
    },

    onRight ({ reset }) {
      this.removeWord()
      this.finalize(reset)
    },

    finalize (reset) {
      this.timer = setTimeout(() => {
        reset()
      }, 1000)
    },
    removeWord() {
      this.removeVocabFromUser(this.vocab._id)
    },
    addWordFromList() {
      const alreadyExists = this.userWords.findIndex(vocab => vocab._id === this.vocab._id)

      if (alreadyExists >= 0) {
        this.showNotif("positive", "Already exists", "done_all")
        return
      }

      this.addVocabToUserList(this.vocab._id)
      .then(() => {
        
      })
      .catch(err => {
        this.showNotif("negative", err, "priority_high")
      })
    },
    showNotif (type, message, icon) {
      const snackbar = {
        type,
        message,
        icon
      }
      this.$q.notify(snackbar)
    }
  },

  beforeDestroy () {
    clearTimeout(this.timer)
  }
}
</script>