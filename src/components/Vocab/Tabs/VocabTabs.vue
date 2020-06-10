<template>
  <div>
    <q-tabs
      dense
      v-model="tab"
      class="text-dark"
      align="left"
    >
      <q-tab name="mywords" label="My Vocab" />
      <q-tab name="allwords" label="All Vocab" />
    </q-tabs>
    <q-tab-panels
      v-model="tab"
      animated
      swipeable
      vertical
      transition-prev="jump-up"
      transition-next="jump-up"
      class="q-pa-none"
    >
      <q-tab-panel name="mywords" class="q-pa-none">
        <div class="row q-pa-none">
          <div class="col-4 q-pa-none">
            <vocablist
              listName="My List"
              :vocabList="userVocabList"
            ></vocablist>
          </div>
          <div class="col-4">
            <vocablist
              listName="All"
              :vocabList="words"
            ></vocablist>
          </div>
        </div>
      </q-tab-panel>

      <q-tab-panel name="allwords">
        <!-- <div class="text-h4 q-mb-md">Account Settings</div> -->
        <h4>
          {{words}}
        </h4>
      </q-tab-panel>
      
    </q-tab-panels>
  </div>
</template>

<script>
export default {
  data: () => ({
    tab: 'mywords',
    splitterModel: 20
  }),
  props: ["userVocabList", "words"],
  components: {
    vocablist: () => import("./VocabList")
  }
}
</script>