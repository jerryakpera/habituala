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
    <template v-if="name" v-slot:append>
      <q-icon 
        name="cancel" 
        @click.stop="$emit('update:name', '')"
        class="cursor-pointer" 
      />
    </template>
  </q-input>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    }
  }
}
</script>

