<template>
  <q-banner 
    dense 
    inline-actions 
    class="text-white bg-red"
    v-if="user.data.flag === 0"
  >
    Welcome {{user.data.username}}, check your email & verify your account to enjoy the full habituala experience
    <template v-slot:action>
      <q-btn 
        flat
        outline
        color="white" 
        label="Resend email" 
      />
    </template>
  </q-banner>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("auth", ["user"])
  }
}
</script>