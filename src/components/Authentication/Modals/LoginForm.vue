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
      <modalheader>Login</modalheader>
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
          v-model="user.email" 
          label="Email"
          :rules="[val => !!val || 'Email is missing', isValidEmail]"
          autofocus
          type="text"
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
      </q-card-section>
      <q-card-actions
        align="right"
      >
        <q-btn
          class="q-mr-sm text-right q-pl-lg q-pr-lg"
          label="Login" 
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
    user: {
      email: "",
      password: ""
    }
  }),
  components: {
    modalheader: () => import("../../Shared/ModalHeader"),
    loading: () => import("../../Shared/Loading")
  },
  methods: {
    ...mapActions("auth", ["loginUser"]),
    isValidEmail (val) {
      const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return emailPattern.test(val) || 'Invalid email';
    },
    submitForm() {
      this.$refs.email.validate()
      this.$refs.password.validate()

      if (!this.$refs.email.hasError && !this.$refs.password.hasError) {
        this.submitLogin()
      }
    },
    submitLogin() {
      this.setLoading(true)
      this.loginUser(this.user)
      .then(res => {
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