<template>
  <q-slide-item 
    @right="onRight"
    right-color="blue"
    left-color="white"
  >
    <q-tooltip 
      :delay="1500" 
      :offset="[0, 10]"
    >
      Slide left to select
    </q-tooltip>
    <template 
      v-slot:right
    >
      <!-- <q-item-section>
        <q-item-label>{{vocab.word}}</q-item-label>
        <q-item-label caption lines="2">{{vocab.definition}}</q-item-label>
      </q-item-section>

      <q-item-section side>
        <q-icon 
          name="check_box"
          color="white" 
        />
      </q-item-section> -->
      <q-icon 
        name="keyboard_backspace" 
      />
    </template>

    <q-item>
      <q-item-section>
        <!-- <q-item-label
          class="text-h5"
        >
          {{vocab.word}}
        </q-item-label> -->
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
    }
  },
  methods: {
    onRight ({ reset }) {
      this.$root.$emit("selectWord", this.vocab)
      this.finalize(reset)
    },

    finalize (reset) {
      this.timer = setTimeout(() => {
        reset()
      }, 2500)
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