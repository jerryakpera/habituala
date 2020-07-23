<template>
  <q-card class="text-black">
    <q-bar>
      <q-space />

      <q-btn dense flat icon="close" v-close-popup>
        <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
      </q-btn>
    </q-bar>

    <q-card-section>
      <div class="overline">
        {{journal.displayDate}}
      </div>
      <div
        class="text-h1 title"
        :class="'text-' + journal.color + '-10'"
      >
        {{journal.title}}
      </div>
      <q-rating
        v-if="journal.type === 'reflection'"
        v-model="journal.rating"
        size="1.51em"
        :max="5"
        color="yellow"
      />
    </q-card-section>

    <div
      v-if="journal.type === 'reflection'"  
      class="row"
    >
      <div class="col-12 col-md-6 text-h6 q-pa-md entry text-weight-thin">
        <div class="text-subtitle2 text-grey-10" >
          Things I did well
        </div>
        {{journal.goodthings}}
      </div>
      <div class="col-12 col-md-6 text-h6 q-pa-md entry text-weight-thin">
        <div class="text-subtitle2 text-grey-10" >
          Things I must improve
        </div>
        {{journal.badthings}}
      </div>
    </div>

    <div
      v-if="journal.type === 'weeding'"  
      class="row"
    >
      <div class="col-12 col-md-6 text-h6 q-pa-md entry text-weight-thin">
        <div class="text-subtitle2 text-grey-10" >
          What you know about the problem
        </div>
        {{journal.objective}}
      </div>
      <div class="col-12 col-md-6 text-h6 q-pa-md entry text-weight-thin">
        <div class="text-subtitle2 text-grey-10" >
          How you feel about the problem
        </div>
        {{journal.subjective}}
      </div>
    </div>

    <div class="row">
      <div class="col-12 text-h6 q-pa-md entry text-weight-thin">
        <div class="text-subtitle2 text-grey-10" >
          Journal Entry
        </div>
        {{journal.entry}}
      </div>
    </div>
  </q-card>
</template>

<script>
export default {
  data: () => ({
    
  }),
  props: {
    journal: {
      type: Object
    }
  },
  components: {
    newweeding: () => import("./Types/NewWeeding"),
    newopen: () => import("./Types/NewOpen"),
    newreflection: () => import("./Types/NewReflection")
  },
  methods: {
    close() {
      this.$emit("closeDialog")
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  font-family: 'Indie Flower', cursive;
}

.entry {
  font-family: 'Merienda', cursive;
}
  
</style>