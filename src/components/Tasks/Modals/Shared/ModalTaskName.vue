<template>
  <q-input
    dense
    standout 
    :value="name"
    label="Task name"
    :rules="[val => !!val || 'Field is required']"
    ref="name"
    autofocus
    @input="$emit('update:name', $event)"
  >
  </q-input>
</template>

<script>
export default {
  props: {
    name: {
      type: String
    }
  }
}
</script>

