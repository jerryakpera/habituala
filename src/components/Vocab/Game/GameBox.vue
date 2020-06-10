<template>
  <q-card class="bg-dark text-white">
    <q-bar>
      <q-space />

      <!-- <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
        <q-tooltip v-if="maximizedToggle" content-class="bg-white text-primary">Minimize</q-tooltip>
      </q-btn>
      <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
        <q-tooltip v-if="!maximizedToggle" content-class="bg-white text-primary">Maximize</q-tooltip>
      </q-btn> -->
      <q-btn dense flat icon="close" v-close-popup>
        <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
      </q-btn>
    </q-bar>

    <q-card-section 
      class="q-pt-none"
      horizontal
    >
      <q-card-section
        class="col-4"
      >
        <vocabgame
          :vocabList="list"
          listName="questiontile"
          :question="game.question"
          :shuffle="game.shuffle"
          :game="game"
        />
      </q-card-section>
      <q-card-section
        class="col-4"
      >
        <q-card-section 
          class="text-center"
          v-if="game.started"
        >
          <q-card-section>
            <div class="text-h6">
              VocabBuilder - {{listName}} Vocab
            </div>
            <q-separator class="text-white" color="white" inset />
            <q-icon
              v-for="(i, key) in game.lives"
              :key="'life' + key"
              color="red"
              name="favorite"
              size="lg"
            />
            <q-separator color="dark" inset />
            <q-icon
              v-for="(i, key) in game.shuffle"
              :key="'shuffle' + key"
              size="lg"
              color="white"
              name="shuffle"
            />
            <div class="text-h3 text-bold q-mt-md">
              Score: {{game.score}}
            </div>
            <div
              class="text-h3 text-bold q-mt-md"
            >
              Streak: {{game.streak}}
            </div>
            <q-separator class="text-white" color="white"  inset />
          </q-card-section>
        </q-card-section>
      </q-card-section>
      <q-card-section
        class="col-4"
      >
        <vocabgame
          v-if="game.started"
          :vocabList="game.words"
          listName="game"
        />
      </q-card-section>
    </q-card-section>
    <audio id="myAudio">
      <source src="../../../statics/sounds/action.mp3" type="audio/mpeg">
      Your browser does not support the audio element.
    </audio>
    <audio id="myAudio2">
      <source src="../../../statics/sounds/inbox.mp3" type="audio/mpeg">
      Your browser does not support the audio element.
    </audio>
  </q-card>
</template>

<<script>
export default {
  data: () => ({
    maximizedToggle: true,
    game: {
      words: [],
      question: {},
      started: false,
      lives: 3,
      shuffle: 3,
      status: false,
      level: 1,
      streak: 0,
      score: 0,
      color: "green"
    },
    vocabGameWords: [],
    show: false
  }),
  props: {
    list: {
      type: Array
    },
    listName: {
      type: String
    },
    gameWords: {
      type: Array
    }
  },
  components: {
    vocabgame: () => import("../Tabs/VocabGame.vue")
  },
  methods: {
    startGame() {
      this.game.lives = 3
      this.game.level = 1
      this.game.score = 0
      this.vocabGameWords = [ ...this.list ]
      this.processGame(this.vocabGameWords)
      this.game.started = true
    },
    shuffleWord() {
      if (this.game.shuffle != 0) {
        this.game.shuffle--
        this.processGame(this.vocabGameWords)
      }
    },
    getRandom(arr, n) {
      var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
      if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
      while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
      }
      return result;
    },
    processGame(vocabList) {
      const level = this.game.level

      const gameLength = (level * 2) <= vocabList.length ? (level * 2) : vocabList.length

      this.game.words = []
      this.game.words = [ ...this.getRandom(vocabList, gameLength) ]
      this.game.question = this.game.words[Math.floor(Math.random() * this.game.words.length)]
    },
    analyze(vocabID) {
      if (this.game.question._id === vocabID) {
        this.correctAnswer()
      } else {
        this.wrongAnswer()
      }
    },
    correctAnswer() {
      this.game.status = !this.game.status
      this.game.color = "green"
      this.playSound("myAudio2")

      this.game.score ++
      this.game.streak ++

      if(this.game.streak % 3 === 0) {
        this.game.level ++
      }

      if (this.game.streak % 7 === 0 && this.game.streak != 0) {
        this.game.lives ++
      }

      setTimeout(() => {
        this.removeVocab()
        this.game.status = !this.game.status
      }, 3800);
    },
    wrongAnswer() {
      this.game.status = !this.game.status
      this.game.color = "red"
      this.playSound("myAudio")

      this.game.streak = 0
      if (this.game.level > 1) {
        this.game.level--
      }

      this.game.lives--
      if (this.game.lives === 0) {
        this.endGame()
      }

      setTimeout(() => {
        this.processGame(this.vocabGameWords)
        this.game.status = !this.game.status
      }, 3800);
      
    },
    removeVocab() {
      const index = this.vocabGameWords.findIndex(vocab => vocab._id == this.game.question._id)

      let vocabList = [ ...this.vocabGameWords ]
      this.vocabGameWords.splice(index, 1)

      this.processGame(this.vocabGameWords)
    },
    endGame() {
      alert("Game Over")
      return
    },
    playSound(audio) {
      var x = document.getElementById(audio)
      x.currentTime = 0.10

      x.play()
    }
  },
  mounted() {
    this.$root.$on("processGame", () => {
      this.processGame(this.list)
    }),

    this.$root.$on("slidLeft", () => {
      if(!this.game.started) this.startGame()
      else this.shuffleWord()
    }),

    this.$root.$on("selectWord", (vocab) => {
      this.analyze(vocab._id)
    })
  }
}
</script>
