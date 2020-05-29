<template>
  <!-- <q-banner 
    inline-actions 
    class="text-white bg-secondary q-pa-sm"
    dense
  >
    T O O L B A R
    <template
      v-slot:action
      class="q-ml-lg"
    >
      <q-icon
        size="xs"
        name="alarm"
        style="cursor: pointer"
      >
        <q-menu
          transition-show="flip-right"
          transition-hide="flip-left"
        >
          <pomodorotimer />
        </q-menu>
      
      </q-icon>
    </template>
    <template v-slot:action>
      <q-icon
        size="xs"
        name="alarm"
        style="cursor: pointer"
      >
        <q-menu
          transition-show="flip-right"
          transition-hide="flip-left"
        >
          <pomodorotimer />
        </q-menu>
      
      </q-icon>
    </template>
  </q-banner> -->
  <q-bar>
    <div class="cursor-pointer">File</div>
    <div class="cursor-pointer">Edit</div>
    <div class="cursor-pointer gt-xs">View</div>
    <div class="cursor-pointer gt-xs">Window</div>
    <div class="cursor-pointer">Help</div>
    <q-space />
    <q-icon
      size="xs"
      name="import_contacts"
      style="cursor: pointer"
      class="q-mr-sm"
    >
      <q-menu
        transition-show="flip-right"
        transition-hide="flip-left"
      >
        <vocabbuilder />
      </q-menu>
    
    </q-icon>
    <q-icon
      size="xs"
      name="alarm"
      style="cursor: pointer"
    >
      <q-menu
        transition-show="flip-right"
        transition-hide="flip-left"
      >
        <pomodorotimer />
      </q-menu>
    
    </q-icon>
  </q-bar>
</template>

<script>
export default {
  components: {
    pomodorotimer: () => import("./Tools/PomodoroTimer"),
    vocabbuilder: () => import("./Tools/VocabBuilder")
  }
}
</script>