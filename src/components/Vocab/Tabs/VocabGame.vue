<template>
  <q-card
    flat
    square
    class="q-pa-xs"
  >
    <!-- <q-btn label="Close Icon" color="primary" @click="openGameModal = true" /> -->
    <q-dialog 
      v-model="openGameModal"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"  
    >
      <gamebox />
    </q-dialog>

    <div v-if="loading" class="row absolute-center">
      <loading />
    </div>
    <div v-else>
      <!-- <q-card-section
        class="text-dark"
        v-if="listName != 'questiontile'"
      >
        <q-input
          bottom-slots 
          v-model="search" 
          label="search"
          dense="dense"
          ref="word"
          @input="filterGameWords"
        > 
          <template v-slot:append>
            <q-icon 
              size="xs"
              name="search"
              class="cursor-pointer"
            />
          </template>
        </q-input>
      </q-card-section> -->
      <q-card-section
        class="q-pa-none text-dark"
      >
        <q-list 
          bordered 
          separator
          class="q-pa-none"
        >
          <questiontile
            v-if="listName == 'questiontile'"
            :vocab="question"
            listName="questiontile"
            :shuffle="shuffle"
            :game="game"
          />
          <gamevocab 
            v-else
            v-for="vocab in vocabList"
            :key="vocab._id"
            :vocab="vocab"
            listName="game"
            @snackbar="openSnackbar"
          />
        </q-list>
      </q-card-section>
      
    </div>
  </q-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data: () => ({
    search: "",
    icon: false,
    bar: false,
    bar2: false,
    toolbar: false,
    openGameModal: false,
    maximizedToggle: true,
    vocabWord: "",
    loading: false
  }),
  props: {
    vocabList: {
      type: Array
    },
    listName: {
      type: String
    },
    question: {
      type: Object
    },
    shuffle: {
      type: Number
    },
    game: {
      type: Object
    }
  },
  components: {
    questiontile: () => import("../Game/QuestionTile"),
    gamevocab: () => import("../Game/GameVocab"),
    gametile: () => import("../Gametile"),
    gamebox: () => import("../Game/GameBox"),
    addvocab: () => import("../AddVocab"),
    loading: () => import("../../Shared/Loading")
  },
  computed: {},
  methods: {
    ...mapActions("retrospect", ["fetchWords"]),
    filterGameWords(search) {
      if (search === "")  {
        this.list(this.vocabList)
      }

      this.vocabList = this.vocabList.filter(vocab => vocab.definition.includes(search))
    },
    openSnackbar(snackbar) {
      this.$root.$emit('showSnackbar', snackbar)
    },
    setLoading(val) {
      this.loading = val
    },
    startGame() {
      console.log("Starting game")
      this.openGameModal = true
    }
  },
  mounted() {
    
  }
}
</script>