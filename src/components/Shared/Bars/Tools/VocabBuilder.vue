<template>
  <q-card 
    class="my-card" 
    flat
    style="width: 300px"
  >
    <q-card-section>
      <div class="text-h4">
        Add Vocab
      </div>
    </q-card-section>
    <q-separator />
    <div
      v-if="loading"
      class="row absolute-center"
    >
      <loading />
    </div>
    <form
      v-if="!loading"
      @submit.prevent="submitVocab"
    >
      <q-card-section class="q-mt-md">
        <q-input 
          color="purple-12" 
          label="Word"
          v-model="vocab.word" 
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
        <q-input 
          color="purple-12" 
          v-model="vocab.definition" 
          label="Definition"
          dense
          rows="2"
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
      </q-card-section>
      <q-card-actions
        class="q-mt-none"
        align="right"
      >
        <q-btn
          label="Save" 
          color="positive"
          flat
          type="submit"
          class="q-mt-none"
        />
      </q-card-actions>
    </form>
  </q-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data: () => ({
    loading: false,
    vocab: {
      word: "",
      definition: ""
    }
  }),
  components: {
    loading: () => import("../../Loading")
  },
  methods: {
    ...mapActions("retrospect", ["addWord"]),
    submitVocab() {
      this.$refs.word.validate()
      this.$refs.definition.validate()

      if (!this.$refs.word.hasError && !this.$refs.definition.hasError) {
        this.submitNewVocab()
      }
    },
    submitNewVocab() {
      this.loading = true
      this.addWord(this.vocab)
      .then(word => {
        this.vocab.word = ""
        this.vocab.definition = ""
        this.loading = false
      })
      .catch(err => {
        this.loading = false
      })
    }
  },
  mounted() {
  }
}
</script>