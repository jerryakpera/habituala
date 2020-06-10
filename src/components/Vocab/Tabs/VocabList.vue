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
      <gamebox 
        :list="vocabList"
        :gameWords="gameWords"
        :listName="listName"
      />
    </q-dialog>

    <div v-if="loading" class="row absolute-center">
      <loading />
    </div>
    <div v-else>
      <q-card-section class="bg-dark text-white" horizontal>
        <q-card-section>
          <div class="text-h6">{{ listName }}</div>
        </q-card-section>
        <q-space />
        <q-card-section>
          <q-badge color="white" text-color="black" :label="vocabList.length" />
        </q-card-section>

      </q-card-section>
      <addvocab 
        v-if="listName != 'My List'"
        @filterWords="filterAllWords"
        @refresh="refreshWords"
        @setLoading="setLoading"
      />
      <q-card-section
        class="q-pa-none"
      >
        <q-list 
          bordered 
          separator
          class="q-pa-none"
        >
          <gametile 
            @startGame="startGame"
          />
          <vocab 
            v-for="vocab in list"
            :key="vocab._id"
            :vocab="vocab"
            :listName="listName"
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
    listName: {
      type: String,
      required: true
    },
    vocabList: {
      type: Array
    },
    gameWords: {
      type: Array
    },
  },
  components: {
    vocab: () => import("../Vocab"),
    gametile: () => import("../Gametile"),
    gamebox: () => import("../Game/GameBox"),
    addvocab: () => import("../AddVocab"),
    loading: () => import("../../Shared/Loading")
  },
  computed: {
    list() {
      return this.vocabList.slice(0, 7)
    }
  },
  methods: {
    ...mapActions("retrospect", ["filterWords", "fetchWords"]),
    filterAllWords(search) {
      if (search === "")  {
        this.refreshWords()
      }
      this.filterWords(search)
    },
    refreshWords() {
      this.loading = true
      this.fetchWords()
      .then(() => {
        this.loading = false
      })
      .catch(err => {
        this.loading = false
      })
    },
    openSnackbar(snackbar) {
      this.$root.$emit('showSnackbar', snackbar)
    },
    setLoading(val) {
      this.loading = val
    },
    startGame() {
      this.openGameModal = true
      this.$root.$emit("processGame")
    }
  },
  mounted() {
    
  }
}
</script>