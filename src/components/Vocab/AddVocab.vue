<template>
  <q-card-section>
    <q-input 
      bottom-slots 
      v-model="vocab.word" 
      label="Word"
      dense="dense"
      @input="filterAllWords"
      ref="word"
    > 
      <template v-slot:append>
        <q-icon
          v-if="vocab.word !== ''"
          name="close"
          size="xs"
          @click="clearVocabWord"
          class="cursor-pointer"
        />
        <q-icon 
          v-if="vocab.word !== '' && !showAddVocab"
          size="xs"
          name="add"
          class="cursor-pointer"
          @click="addNewVocab"
        />
      </template>
    </q-input>
    <div
      v-if="showAddVocab"
    >
      <q-input 
        v-model="vocab.definition" 
        label="Definition" 
        counter
        dense="dense"
        rows="3"
        type="textarea"
        bottom-slots
        ref="definition"
      > 
        <template v-slot:append>
          <q-icon 
            v-if="vocab.definition !== ''"
            name="close"
            size="xs"
            @click="clearVocabDefinition"
            class="cursor-pointer"
          />
          <q-icon
            size="xs"
            name="add"
            class="cursor-pointer"
            @click="addNewVocab"
          />
        </template>
      </q-input>

    </div>
  </q-card-section>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data: () => ({
    showAddVocab: false,
    vocab: {
      word: "",
      definition: ""
    }
  }),
  methods: {
    ...mapActions("retrospect", ["addWord", "fetchUserWords", "fetchWords"]),
    filterAllWords() {
      this.$emit("filterWords", this.vocab.word)
    },
    clearVocabWord() {
      this.vocab.word = ""
      this.showAddVocab = false
      this.$emit("refresh")
    },
    clearVocabDefinition() {
      this.vocab.definition = ""
    },
    addNewVocab() {
      if (!this.showAddVocab) {
        console.log("Showing vocab input")
        this.showAddVocab = true
        return
      }
        const vocab = {
        word: this.vocab.word,
        definition: this.vocab.definition
      }

      if (this.showAddVocab) {
        this.$refs.word.validate()
        this.$refs.definition.validate()

        if (!this.$refs.word.hasError && !this.$refs.definition.hasError) {
          this.submitNewVocab(vocab)
        }
      }
    },
    submitNewVocab(vocab) {
      this.addWord(vocab)
      .then(() => {
        this.vocab.word = ""
        this.vocab.definition = ""
        this.fetchUserWords()
        .then(() => {
          this.showAddVocab = false
          this.fetchWords()
        })
        .catch(() => {
          this.$emit("refresh")
        })
      })
      .catch(err => {
        this.$emit("refresh")
      })
    }
  }
}
</script>