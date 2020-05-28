<template>
  <q-card>
    <q-card-section
      v-if="loading"
    >
      <loading />
    </q-card-section>
    <q-card-section
      class="row"
      v-if="!loading"
    >
      <modalheader>Update Username</modalheader>
      <q-space />
      <q-btn
        dense
        size="10px"
        round 
        flat
        icon="close"
        v-close-popup
      />
    </q-card-section>
    <form 
      @submit.prevent="submitForm"
      v-if="!loading"  
    >
      <q-card-section class="q-pt-none">
        <q-input 
          v-model="username" 
          label="New Username"
          :rules="[val => !!val || 'New username is missing', isNotSame]"
          autofocus
          type="text"
          style="width: 300px"
          dense
          ref="username"
        />
      </q-card-section>
      <q-card-actions
        align="right"
      >
        <q-btn
          class="q-mr-sm text-right q-pl-lg q-pr-lg"
          label="Save" 
          color="positive"
          type="submit"
        />
      </q-card-actions>
    </form>
  </q-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    loading: false,
    showPassword: true,
    username: ""
  }),
  components: {
    modalheader: () => import("../../Shared/ModalHeader"),
    loading: () => import("../../Shared/Loading")
  },
  computed: {
    ...mapGetters("auth", ["user"])
  },
  methods: {
    ...mapActions("auth", ["updateUserDetails"]),
    isNotSame(val) {
      return val != this.user.data.username || "Must be different"
    },
    submitForm() {
      this.$refs.username.validate()

      if (!this.$refs.username.hasError) {
        this.submitUpdateForm()
      }
    },
    submitUpdateForm() {
      this.setLoading(true)
      const updateUser = {
        username: this.username
      }
      this.updateUserDetails(updateUser)
      .then(res => {
        this.setLoading(false)
        const snackbar = {
          message: "Username updated",
          icon: "done_all"
        }
        this.openSnackbar(snackbar)
        this.$emit("closeDialog")
      })
      .catch(err => {
        this.$emit("closeDialog")
        const snackbar = {
          message: err,
          icon: "priority_high"
        }
        this.openSnackbar(snackbar)
        this.setLoading(false)
      })
    },
    openSnackbar(snackbar) {
      this.$root.$emit('showSnackbar', snackbar)
    },
    setLoading(val) {
      this.loading = val
    }
  },
  mounted() {
    this.username = this.user.data.username
  }
}
</script>