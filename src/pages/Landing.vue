<template>
  <div class="absolute-center">
    <div class="row">
      <span class="text-h1">Welcome to HABITUAL</span>
      <span>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae eaque expedita fuga cupiditate.
      </span>
    </div>
    <hr />
    <div class="row">
      <q-btn 
        unelevated
        color="primary"
        @click="showLoginForm = true"
        label="Login" 
        class="q-mr-lg" 
      />
      <q-btn 
        @click="showSignupForm = true"
        unelevated
        color="secondary" 
        label="Sign up" 
      />
    </div>
    <q-dialog v-model="showLoginForm">
      <loginform 
        @closeAddTaskDialog="showLoginForm = false"
      />
    </q-dialog>
    <q-dialog v-model="showSignupForm">
      <signupform 
        @closeAddTaskDialog="showSignupForm = false"
      />
    </q-dialog>
    <snackbar />
  </div>
</template>

<script>
export default {
  data: () => ({
    showLoginForm: false,
    showSignupForm: false
  }),
  components: {
    loginform: () => import("../components/Authentication/Modals/LoginForm"),
    signupform: () => import("../components/Authentication/Modals/SignupForm"),
    snackbar: () => import("../components/Shared/Snackbar")
  }
}
</script>