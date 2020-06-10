<template>
  <q-card 
    style="width: 300px"
    class="my-card bg-dark text-white"
  >
    <q-card-section 
      horizontal
      v-if="!gameOver"
    >
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
      v-if="!gameOver"
    />
    <q-card-section
      v-if="!gameOver"
    >
      <div 
        class="text-h6 text-center"
        v-if="gameWords[0]"
      >
        {{gameWords[wordIndex].word}}
      </div>
    </q-card-section>
    <q-card-section
      v-if="!gameOver"
    >
      <div 
        v-if="!showingDefinition"
        class="text-h6 text-center"
      >
        ??
      </div>
      <div 
        v-if="showingDefinition && gameWords[0]"
        class="text-h6 text-center"
      >
        {{gameWords[wordIndex].definition}}
      </div>
    </q-card-section>
    <q-card-section v-if="gameOver">
      <div class="text-h4 text-center">
        Game Over
      </div>
      <div class="text-h4 text-center">
        Score: {{score}}
      </div>
      <div class="text-h4 text-center">
        Longest streak: {{longestStreak}}
      </div>
    </q-card-section>

    <q-card-actions
      align="center"
      class="q-mb-sm"
       v-if="!gameOver"
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
    gameOver: false,
    showingDefinition: false,
    score: 0,
    lives: 3,
    wordIndex: 0,
    gameWords: [],
    gameScore: [],
    longestStreak: 0,
    currentStreak: 0
  }),
  props: {
    game: {
      type: Object,
      required: true
    }
  },
  methods: {
    startGame() {
      this.gameWords = this.gameWords.filter(word => {
        if (word.flag === 0) return word
      })

      this.wordIndex = 0
      return
    },
    endGame() {
      if(this.gameWords.filter(word => !word.flag).length > 0) {
        this.showingDefinition = false
        this.startGame()
        return
      }
      
      this.gameOver = true
    },
    showDefinition() {
      this.showingDefinition = true
    },
    nextWord() {
      if(this.gameWords.length === this.wordIndex + 1) {
        this.endGame()
        return
      }

      this.showingDefinition = false
      this.wordIndex++
    },
    correct() {
      this.score ++
      this.currentStreak ++
      if (this.currentStreak > this.longestStreak) {
        this.longestStreak ++
      }

      this.gameWords[this.wordIndex].flag = 1
      this.nextWord()
    },
    wrong() {
      if (this.score > 0) {
        this.score --
      }

      this.currentStreak = 0
      this.nextWord()
    },
  },
  mounted() {
    this.game.words.forEach(word => {
      this.gameWords.push({
        flag: 0,
        ...word
      })
    })
    this.startGame()
  }
}
</script>