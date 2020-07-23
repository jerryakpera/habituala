<template>
  <q-page padding>
    <div 
      class="row absolute-center"
      v-if="loading"
    >
      <loading />
    </div>
    <q-card
      class="my-card"
      flat
      v-if="!loading"
    >
      <div class="q-px-lg q-mt-lg text-h6">Profile</div>
      <q-separator />
      <q-list>
        <q-item
          clickable
          @click="showUpdateDetails = true"
        >
          <q-item-section avatar>
            <q-icon color="primary" name="face" />
          </q-item-section>

          <q-item-section>
            <q-item-label caption>Username</q-item-label>
            <q-item-label>{{userProfile.username}}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          clickable
          @click="showChangePassword = true"
        >
          <q-item-section avatar>
            <q-icon color="positive" name="vpn_key" />
          </q-item-section>

          <q-item-section>
            <q-item-label caption>Password</q-item-label>
            <q-item-label>Change password</q-item-label>
          </q-item-section>
        </q-item>

        <q-item >
          <q-item-section avatar>
            <q-icon color="red" name="alternate_email" />
          </q-item-section>

          <q-item-section>
            <q-item-label caption>Email</q-item-label>
            <q-item-label>{{userProfile.email}}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item >
          <q-item-section avatar>
            <q-icon color="grey" name="toggle_off" />
          </q-item-section>

          <q-item-section>
            <q-item-label caption>Account Status</q-item-label>
            <q-item-label>
              {{ userProfile.flag == 1 ? 'Active' : 'Pending' }}
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-item >
          <q-item-section avatar>
            <q-icon color="amber" name="calendar_today" />
          </q-item-section>

          <q-item-section>
            <q-item-label caption>Account Created</q-item-label>
            <q-item-label>{{ userProfile.createdDate }}</q-item-label>
          </q-item-section>
        </q-item>

      </q-list>
      
      <div class="q-px-lg q-mt-lg text-h6">Tasks</div>
      <q-separator />
      <q-list>
        <q-item
          clickable
          to="/tasks"  
        >
          <q-item-section avatar>
            <q-icon color="primary" name="all_inclusive" />
          </q-item-section>

          <q-item-section>
            <q-item-label caption>All Tasks</q-item-label>
            <q-item-label>{{ userProfile.tasks.all }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item >
          <q-item-section avatar>
            <q-icon color="positive" name="check_circle" />
          </q-item-section>

          <q-item-section>
            <q-item-label caption>Complete Tasks</q-item-label>
            <q-item-label>{{ userProfile.tasks.complete }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item >
          <q-item-section avatar>
            <q-icon color="red" name="check_circle_outline" />
          </q-item-section>

          <q-item-section>
            <q-item-label caption>Incomplete Tasks</q-item-label>
            <q-item-label>{{ userProfile.tasks.incomplete }}</q-item-label>
          </q-item-section>
        </q-item>

      </q-list>
      
      <div class="q-px-lg q-mt-lg text-h6">Journals</div>
      <q-separator />
      <q-list>
        <q-item
          clickable
          to="/journals"  
        >
          <q-item-section avatar>
            <q-icon color="primary" name="all_inclusive" />
          </q-item-section>

          <q-item-section>
            <q-item-label caption>All Journals</q-item-label>
            <q-item-label>{{ userProfile.journals.all }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item >
          <q-item-section avatar>
            <q-icon color="grey-10" name="import_contacts" />
          </q-item-section>

          <q-item-section>
            <q-item-label caption>Open Journals</q-item-label>
            <q-item-label>{{ userProfile.journals.open }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item >
          <q-item-section avatar>
            <q-icon color="blue-10" name="report_problem" />
          </q-item-section>

          <q-item-section>
            <q-item-label caption>Weeding Journals</q-item-label>
            <q-item-label>{{ userProfile.journals.weeding }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item >
          <q-item-section avatar>
            <q-icon color="red-10" name="find_in_page" />
          </q-item-section>

          <q-item-section>
            <q-item-label caption>Reflection Journals</q-item-label>
            <!-- <q-item-label>{{ userProfile.journals.reflection }}</q-item-label> -->
          </q-item-section>
        </q-item>

      </q-list>

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
    </q-card>
  </q-page>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    loading: false,
    tab: "profile",
    showUpdateDetails: false,
    showChangePassword: false
  }),
  computed: {
    ...mapGetters("auth", ["user"]),
    ...mapGetters("userProfile", ["userProfile"])
  },
  components: {
    updatedetails: () => import("../components/Settings/modals/UpdateDetails"),
    changepassword: () => import("../components/Settings/modals/ChangePassword"),
    loading: () => import("../components/Shared/Loading")
  },
  methods: {
    ...mapActions("userProfile", ["fetchUserProfile"]),
    getUserProfile() {
      this.loading = true
      this.fetchUserProfile()
      .then(() => {
        this.loading = false
      })
      .catch(err => {
        this.loading = false
      })
    }
  },
  created() {
    this.getUserProfile()
  }
}
</script>