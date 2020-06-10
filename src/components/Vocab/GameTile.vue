<template>
  <q-slide-item
    @left="startGame" 
    @right="onRight"
    right-color="red"
    left-color="red"
  >
    <template 
      v-slot:left
    >
      <q-icon 
        name="flag"
      />
    </template>
    <q-item>
      <q-item-section>
        <q-item-label
          class="text-h5"
        >
          VocabBuilder
        </q-item-label>
        <q-item-label
          class="text-subtitle1"
        >
          slide right to play
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-slide-item>
</template>

<script>
export default {
  data: () => ({
    gameStarted: false
  }),
  props: {
    
  },
  computed: {
  },
  methods: {
    startGame({ reset }) {
      this.$emit("startGame")
      this.finalize(reset)
    },

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