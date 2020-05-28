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
      <modalheader>Signup</modalheader>
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
          v-model="user.username" 
          label="Username"
          :rules="[val => !!val || 'Username is missing']"
          type="text"
          style="width: 300px"
          dense
          ref="username"
          autofocus
        />
        <q-input 
          v-model="user.email" 
          label="Email"
          type="text"
          :rules="[val => !!val || 'Email is missing', isValidEmail]"
          style="width: 300px"
          dense
          ref="email"
        />
        <q-input 
          v-model="user.password" 
          :type="showPassword ? 'password' : 'text'"
          label="Password"
          :rules="[val => val.length >= 8 || 'Password is too short']"
          style="width: 300px"
          dense
          class="q-mt-lg"
          ref="password"
        >
          <template v-slot:append>
            <q-icon 
              :name="showPassword ? 'visibility' : 'visibility_off'" 
              color="dark"
              style="cursor: pointer"
              @click="showPassword = !showPassword"
            />
          </template> 
        </q-input>
        <q-input 
          v-model="user.confirmpassword" 
          :type="showConfirmPassword ? 'password' : 'text'"
          label="Confirm Password"
          style="width: 300px"
          dense
          :rules="[val => val.length >= 8 || 'Confirm password is too short', isPasswordMatch]"
          class="q-mt-lg"
          ref="confirmpassword"
        >
          <template v-slot:append>
            <q-icon 
              :name="showConfirmPassword ? 'visibility' : 'visibility_off'" 
              color="dark"
              style="cursor: pointer"
              @click="showConfirmPassword = !showConfirmPassword"
            />
          </template> 
        </q-input>
      </q-card-section>
      <q-card-actions
        align="right"
      >
        <q-btn
          class="q-mr-sm text-right q-pl-lg q-pr-lg"
          label="Signup" 
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
    loading: false,
    showPassword: true,
    showConfirmPassword: true,
    user: {
      username: "",
      email: "",
      password: "",
      confirmpassword: "",
    }
  }),
  components: {
    modalheader: () => import("../../Shared/ModalHeader"),
    loading: () => import("../../Shared/Loading")
  },
  methods: {
    ...mapActions("auth", ["registerUser"]),
    isValidEmail (val) {
      const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return emailPattern.test(val) || 'Invalid email';
    },
    isPasswordMatch(val) {
      return this.user.password == val || 'Passwords must match'
    },
    submitForm() {
      this.$refs.username.validate()
      this.$refs.email.validate()
      this.$refs.password.validate()
      this.$refs.confirmpassword.validate()

      if (!this.$refs.username.hasError && !this.$refs.email.hasError && !this.$refs.password.hasError && !this.$refs.confirmpassword.hasError) {
        this.submitSignup()
      }
    },
    submitSignup() {
      this.setLoading(true)
      this.registerUser(this.user)
      .then(res => {
        // this.setLoading(false)
        this.$router.push("/")
      })
      .catch(err => {
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
  }
}
</script>