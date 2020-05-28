<template>
  <q-banner 
    class="bg-dark"
    dense
    dark
  >
    <template v-slot:avatar>
      <q-icon name="check" color="positive" />
    </template>
    <span class="text-h6 text-white">
      You have no pending tasks.

    </span>
    <template v-slot:action>
      <q-btn
        outline
        rounded 
        color="white"
        class="q-mr-md"
        icon="add"
        size="sm"
        label="Add a task"
        @click="$root.$emit('addNewTask')"
      />
    </template>
  </q-banner>
</template>
<script>
export default {
  
}
</script>