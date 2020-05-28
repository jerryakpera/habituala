<template>
  <q-input
    dense
    standout
    label="Due time"
    :value="dueTime"
    class="q-mt-md"
    v-if="dueDate"
    @input="$emit('update:dueTime', $event)"
  >
    <template v-slot:append>
      <q-icon
        v-if="dueTime"
        name="cancel" 
        @click.stop="$emit('update:dueTime', '')" 
        class="cursor-pointer" 
      />
      <q-icon 
        name="access_time" 
        class="cursor-pointer"
      >
        <q-popup-proxy 
          transition-show="scale" 
          transition-hide="scale"
        >
          <q-time 
            :value="dueTime"
            @input="$emit('update:dueTime', $event)"
          />
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script>
export default {
  props: ["dueTime", "dueDate"]
}
</script>