<template>
  <q-banner 
    inline-actions 
    class="text-white bg-secondary q-pa-sm"
    dense
  >
    T O O L B A R
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
  </q-banner>
</template>

<script>
export default {
  components: {
    pomodorotimer: () => import("./Tools/PomodoroTimer")
  }
}
</script>