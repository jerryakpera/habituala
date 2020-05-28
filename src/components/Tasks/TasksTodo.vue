<template>
  <div>
    <q-banner
      dense
      :class="'bg-' + color"
      class="list-header"
    >
      <span
        class="text-white text-bold text-subtitle1"
      >
        {{title}}
      </span>
    </q-banner>
    <q-list 
      bordered
      separator
    >
      <task 
        v-for="(task, key) in tasks"
        :key="key"
        :task="task"
        :id="key"
      />
    </q-list>
  </div>
</template>
<script>
export default {
  props: {
    tasks: {
      type: Object,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    },
  },
  components: {
    task: () => import("./Task.vue"),
  }
}
</script>

<style scoped>
.list-header {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
</style>