<template>
  <q-slide-item 
    @left="onLeft" 
    @right="onRight"
    right-color="red"
    left-color="white"
    class="q-ma-none bg-blue"
  >
    <q-tooltip 
      :delay="1500" 
      :offset="[0, 10]"
    >
      Slide right to shuffle
    </q-tooltip>
    <template 
      v-if="listName == 'questiontile'"
      v-slot:left
    >
      <q-icon
        color="dark"
        :name="shuffle >= 0 ? 'shuffle' : 'sentiment_dissatisfied'"
      />
    </template>
    <template 
      v-else-if="listName == 'game'"
      v-slot:right
    >
      <q-icon 
        name="remove" 
      />
    </template>

    <q-item v-if="!game.status">
      <q-item-section>
        <q-item-label
          class="text-h5 text-white"
        >
          {{vocab.word ? vocab.word : 'Slide to start'}}
        </q-item-label>
        <!-- <q-item-label
          v-if="game.status"
          class="text-subtitle1"
        >
          {{vocab.definition}}
        </q-item-label> -->
      </q-item-section>
    </q-item>

    <q-item 
      :class="'bg-' + game.color + '-5'"
      v-if="game.status"
    >
      <q-item-section
      >
        <q-item-label
          class="text-h5 text-white"
        >
          {{vocab.word ? vocab.word : 'Slide to start'}}
        </q-item-label>
        <q-item-label
          class="text-subtitle1 text-white"
        >
          {{vocab.definition}}
        </q-item-label>
      </q-item-section>
      <q-item-section avatar>
        <q-icon
          class="text-white"
          :name="game.color == 'green' ? 'check_box' : 'close'"
        />
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
    },
    shuffle: {
      type: Number
    },
    game: {
      type: Object
    }
  },
  computed: {
    ...mapGetters("retrospect", ["userWords"]),
  },
  methods: {
    ...mapActions("retrospect", ["addVocabToUserList", "removeVocabFromUser"]),

    onLeft ({ reset }) {
      this.$root.$emit("slidLeft")
      this.finalize(reset)
    },

    onRight ({ reset }) {
      this.removeWord()
      this.finalize(reset)
    },

    finalize (reset) {
      this.timer = setTimeout(() => {
        reset()
      }, 500)
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