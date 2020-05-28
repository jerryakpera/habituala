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
      <modalheader>Change Password</modalheader>
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
          v-model="user.currentpassword" 
          :type="showCurrentPassword ? 'password' : 'text'"
          label="Current Password"
          style="width: 300px"
          dense
          :rules="[val => val.length >= 8 || 'Password is too short']"
          class="q-mt-lg"
          ref="currentpassword"
          autofocus
        >
          <template v-slot:append>
            <q-icon 
              :name="showCurrentPassword ? 'visibility' : 'visibility_off'" 
              color="dark"
              style="cursor: pointer"
              @click="showCurrentPassword = !showCurrentPassword"
            />
          </template> 
        </q-input>
        <q-input 
          v-model="user.newpassword" 
          :type="showNewPassword ? 'password' : 'text'"
          label="New Password"
          style="width: 300px"
          dense
          :rules="[val => val.length >= 8 || 'Password is too short', isDifferent]"
          class="q-mt-lg"
          ref="newpassword"
        >
          <template v-slot:append>
            <q-icon 
              :name="showNewPassword ? 'visibility' : 'visibility_off'" 
              color="dark"
              style="cursor: pointer"
              @click="showNewPassword = !showNewPassword"
            />
          </template> 
        </q-input>
        <q-input 
          v-model="user.confirmnewpassword" 
          :type="showConfirmNewPassword ? 'password' : 'text'"
          label="Confirm New Password"
          style="width: 300px"
          dense
          :rules="[val => val.length >= 8 || 'Password is too short', isNotSame]"
          class="q-mt-lg"
          ref="confirmnewpassword"
        >
          <template v-slot:append>
            <q-icon 
              :name="showConfirmNewPassword ? 'visibility' : 'visibility_off'" 
              color="dark"
              style="cursor: pointer"
              @click="showConfirmNewPassword = !showConfirmNewPassword"
            />
          </template> 
        </q-input>
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
import { mapActions } from "vuex";

export default {
  data: () => ({
    showCurrentPassword: true,
    showNewPassword: true,
    showConfirmNewPassword: true,
    loading: false,
    user: {
      currentpassword: "",
      newpassword: "",
      confirmnewpassword: ""
    }
  }),
  components: {
    modalheader: () => import("../../Shared/ModalHeader"),
    loading: () => import("../../Shared/Loading")
  },
  computed: {
  },
  methods: {
    ...mapActions("auth", ["updatePassword"]),
    isNotSame(val) {
      return val === this.user.newpassword || "Passwords must match"
    },
    isDifferent(val) {
      return val != this.user.currentpassword || "Current and new passwords must be different"
    },
    submitForm() {
      this.$refs.currentpassword.validate()
      this.$refs.newpassword.validate()
      this.$refs.confirmnewpassword.validate()

      if (!this.$refs.currentpassword.hasError && !this.$refs.newpassword.hasError && !this.$refs.confirmnewpassword.hasError) {
        this.submitUpdatePassword()
      }
    },
    submitUpdatePassword() {
      this.setLoading(true)
      
      this.updatePassword(this.user)
      .then(res => {
        this.setLoading(false)
        const snackbar = {
          message: "Password changed successfully",
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
  }
}
</script>