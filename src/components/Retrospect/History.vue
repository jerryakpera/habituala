<template>
  <div>
    <div
      v-if="loading" 
      class="row absolute-center"
    >
      <loading />
    </div>
    <div v-if="!loading">
      <q-list 
        bordered
        separator  
      >
        <q-item
          v-for="item in userRetrospects"
          :key="item._id"
          clickable
        >
          <q-item-section>
            <q-item-label class="text-red" caption lines="2">
              {{item.displayDate}}
            </q-item-label>
            <q-item-label>{{item.title}}</q-item-label>
            <q-item-label caption lines="2">
              {{item.journal.journal}}
            </q-item-label>
          </q-item-section>

          <q-item-section horizontal side>
            <q-rating
              v-model="item.rating"
              size="1.2em"
              icon="star"
              color="yellow"
            />
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    loading: false
  }),
  components: {
    loading: () => import("../Shared/Loading")
  },
  computed: {
    ...mapGetters("retrospect", ["userRetrospects"])
  },
  methods: {
    ...mapActions("retrospect", ["fetchUserRetrospects"]),
    getUserRetrospects() {
      this.setLoading(true)
      this.fetchUserRetrospects()
      .then(() => {
        this.setLoading(false)
      })
      .catch(err => {
        this.setLoading(false)
      })
    },
    setLoading(val) {
      this.loading = val
    },
    openSnackbar(snackbar) {
      this.$root.$emit("showSnackbar", snackbar)
    }
  },
  mounted() {
    this.getUserRetrospects()
  }
}
</script>