<template>
  <div class="flex flex-center">
   <q-card
      class="my-card"
      flat
    >
      <div class="row q-ma-lg">
        <div class="col-12 col-sm-6 col-md-6">
          <div class="text-h2">Welcome to <span class="text-primary">HABITUAL</span></div>

          <q-separator 
            class="q-mb-sm q-mt-sm"
          />
          <div 
            class="text"
          >
            <p>
              Manage your tasks and larger projects with Habituala's Task Management System
            </p>
            <p>
              Note down your dreams and thoughts, and keep track of your progress and improvements
            </p>
          </div>
          <q-btn 
            @click="showSignupForm = true"
            unelevated
            color="secondary" 
            label="Get started" 
          />
        </div>

        <login />
      </div>
    </q-card>
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
    login: () => import("../components/Authentication/Modals/Login"),
    signupform: () => import("../components/Authentication/Modals/SignupForm"),
    snackbar: () => import("../components/Shared/Snackbar")
  }
}
</script>

<style lang="scss" scoped>
.title {
  font-family: 'Indie Flower', cursive;
}

.text {
  font-family: 'Merienda', cursive;
}
  
</style>