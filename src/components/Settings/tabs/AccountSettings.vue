<template>
  <q-card 
    flat
    class="my-card"
  >
    <q-card-section class="bg-accent text-dark">
      <div class="text-h5">Account Settings</div>
    </q-card-section>
    <q-separator />
    <q-card-section 
      class="bg-accent text-dark"
    >
      <div 
        class="text-h6"
      >
        Update Account Details
        <div 
          class="text-subtitle1 q-mt-md"
          @click="showUpdateDetails = true"
          style="cursor: pointer"
        >
          Update Details
        </div>
        <div 
          class="text-subtitle1 q-mt-md"
          @click="showChangePassword = true"
          style="cursor: pointer"
        >
          Change password
        </div>
        <div class="text-subtitle1 q-mt-md">Forgot password</div>
      </div>
    </q-card-section>
    <q-separator />
    <q-dialog v-model="showUpdateDetails">
      <updatedetails 
        @closeDialog="showUpdateDetails = false"  
      />
    </q-dialog>
    <q-dialog v-model="showChangePassword">
      <changepassword 
        @closeDialog="showChangePassword = false"  
      />
    </q-dialog>
    <snackbar />
  </q-card>

</template>

<script>
export default {
  data: () => ({
    showUpdateDetails: false,
    showChangePassword: false
  }),
  components: {
    updatedetails: () => import("../modals/UpdateDetails"),
    changepassword: () => import("../modals/ChangePassword"),
    snackbar: () => import("../../Shared/Snackbar")
  }
}
</script>