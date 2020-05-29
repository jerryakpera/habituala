<template>
  <q-card 
    style="width: 300px"
    class="my-card bg-dark text-white"
  >
    <q-card-section horizontal>
      <q-card-section class="col-9">
        Score: {{score}}
      </q-card-section>
      <q-card-section>
        <q-icon
          v-for="(i, key) in lives"
          :key="key"
          color="red"
          name="favorite"
        />
      </q-card-section>
    </q-card-section>
    <q-separator 
      inset 
      class="text-white" 
      dark 
    />
    <q-card-section>
      <div 
        class="text-h3 text-center"
      >
        {{currentWord.word}}
      </div>
    </q-card-section>
    <q-card-section>
      <div 
        v-if="!showingDefinition"
        class="text-h6 text-center"
      >
        ??
      </div>
      <div 
        v-if="showingDefinition"
        class="text-h6 text-center"
      >
        {{currentWord.definition}}
      </div>
    </q-card-section>

    <q-card-actions
      align="center"
      class="q-mb-sm"
    >
      <q-btn 
        v-if="!showingDefinition"
        unelevated
        color="red" 
        label="Show" 
        size="sm"
        @click="showDefinition"
      />
      <q-btn 
        v-if="showingDefinition"
        unelevated
        round
        color="red" 
        icon="close" 
        size="sm"
        @click="wrong"
      />
      <q-btn 
        v-if="showingDefinition"
        unelevated
        round
        color="positive" 
        icon="done" 
        size="sm"
        @click="correct"
      />
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  data: () => ({
    showingDefinition: false,
    currentWord: {
      flag: 0,
      word: "",
      definition: ""
    },
    score: 0,
    lives: 3,
    wordIndex: 0,
    gameWords: []
  }),
  props: {
    game: {
      type: Object,
      required: true
    }
  },
  methods: {
    startGame() {
      this.currentWord = this.gameWords[this.wordIndex]
    },
    showDefinition() {
      this.showingDefinition = true
    },
    nextWord() {
      this.showingDefinition = false
      this.wordIndex ++
      
      this.currentWord = this.gameWords[this.wordIndex]
    },
    correct() {
      this.score ++
      this.currentWord.flag = 1
      this.gameWords.push(this.currentWords)
      this.nextWord()
    },
    wrong() {
      if (this.score > 0) {
        this.score --
      }
      this.gameWords.push(this.currentWords)
      this.nextWord()
    },
  },
  mounted() {
    this.gameWords = [ ...this.game.words ]
    this.startGame()
  }
}
</script>