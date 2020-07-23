<template>
  <div class="col-4 q-pa-xs">
    <q-card 
      class="my-card cursor-pointer"
      square
      color="border-primary"
      bordered
      flat
    >
      <q-card-section>
        {{journal}}
        <div class="text-h6 text-white">
          {{journal.title}}
        </div>
        <div 
          class="text-subtitle2 text-grey-3"
        >
          {{journal.description}}
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  props: {
    journal: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.my-card {
  border: 1px solid red;
}
</style>