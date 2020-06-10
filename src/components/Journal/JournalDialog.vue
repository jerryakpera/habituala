<template>
  <q-card>
    <q-bar
      :class="'bg-' + journal.color + '-10'"
      class="text-white"
    >
      {{journal.title}} journal
      <q-space />

      <q-btn 
        dense
        flat 
        icon="close" 
        v-close-popup
        size="sm"
      >
        <q-tooltip 
          content-class="bg-white text-primary"
        >
          Close
        </q-tooltip>
      </q-btn>
    </q-bar>
    <newopen 
      v-if="journal.title == 'open'" 
      @closeDialog="close"
    />
    <newweeding 
      v-if="journal.title == 'weeding'" 
      @closeDialog="close"
    />
    <newreflection 
      v-if="journal.title == 'reflection'" 
      @closeDialog="close"
    />
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