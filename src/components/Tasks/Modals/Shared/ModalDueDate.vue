<template>
  <q-input
    dense
    standout
    label="Due date"
    :value="dueDate"
    class="q-mt-md"
    @input="$emit('update:dueDate', $event)"
  >
    <template v-slot:append>
      <q-icon
        v-if="dueDate"
        name="cancel" 
        @click.stop="$emit('clearDate')" 
        class="cursor-pointer" 
      />
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
          <q-date
            :value="dueDate" 
            @input="$emit('update:dueDate', $event)"
            />
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script>
export default {
  props: ["dueDate"]
}
</script>