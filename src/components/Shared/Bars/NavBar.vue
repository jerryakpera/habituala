<template>
  <q-toolbar 
    class="bg-accent text-dark"  
  >
    <q-btn 
      flat 
      round 
      dense 
      icon="home"
      to="/"
    />
    <q-toolbar-title>
      HABITUALA
    </q-toolbar-title>
    <q-btn 
      flat 
      round 
      dense 
      icon="apps" 
      class="q-mr-xs" 
    />
    <q-btn-dropdown  
      flat
    >
      <q-list
        style="width: 250px"
      >
        <q-item-label 
          header
        >
          User
        </q-item-label>
        <q-item 
          clickable
          tabindex="0"
        >
          <q-item-section avatar>
            <q-avatar 
              icon="person" 
              color="secondary" 
              text-color="white"
              size="sm"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label>Profile</q-item-label>
          </q-item-section>
        </q-item>
        <q-item 
          clickable
          tabindex="0"
          @click="logUserout"
        >
          <q-item-section avatar>
            <q-avatar 
              icon="exit_to_app" 
              color="secondary" 
              text-color="white"
              size="sm"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label>Logout</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator inset spaced />
        <q-item-label header>Settings</q-item-label>
        <q-item 
          clickable
          tabindex="0"
          to="/settings"
        >
          <q-item-section avatar>
            <q-avatar 
              icon="settings" 
              color="secondary" 
              text-color="white"
              size="sm"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label>Settings</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
  </q-toolbar>
</template>
<script>
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions("auth", ["logout"]),
    logUserout() {
      this.logout()
      .then(() => {
        this.$router.push("/login")
      })
    }
  }
}
</script>