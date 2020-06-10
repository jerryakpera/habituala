<template>
  <q-page>
    <div 
      class="row absolute-center"
      v-if="loading"
    >
      <loading />
    </div>
    <div v-if="!loading">
      <div class="row">
        <div class="col-4 q-pa-xs">
          <q-card 
            flat
            bordered
            square  
          >
            <q-card-section horizontal v-if="!homeBoard.title">
              <q-card-section class="col-2">
                <q-icon 
                  color="primary" 
                  name="trending_up" 
                />
              </q-card-section>
              <q-card-section>
                <div class="text-h6 q-mt-none">Your day</div>
                <div class="text-caption text-primary">Do the necessary!</div>
              </q-card-section>
            </q-card-section>
            <q-card-section v-if="homeBoard.title">
              <div class="text-h6 q-mt-none">{{homeBoard.title}}</div>
              <div class="text-caption text-primary">{{homeBoard.displayDate}}</div>
            </q-card-section>

            <q-separator v-if="homeBoard.title" inset />

            <q-card-section 
              v-if="homeBoard.title" 
              class="q-mt-none">
              {{ homeBoard.journal }}
            </q-card-section>
          </q-card>
        </div>
        <div class="col-4 q-pa-xs">
          <q-card 
            flat
            bordered
            square  
          >
            <q-card-section horizontal>
              <q-card-section class="col-2">
                <q-icon 
                  color="primary" 
                  name="trending_up" 
                />
              </q-card-section>
              <q-card-section>
                <div class="text-h6 q-mt-none">Latest Progress</div>
                <div class="text-caption text-primary">Keep the momentum going</div>
              </q-card-section>
            </q-card-section>

            <q-separator v-if="homeBoard.progress" inset />

            <q-card-section 
              class="q-mt-none"
              v-if="homeBoard.progress"  
            >
              <q-list>
                <q-item 
                  dense  
                >
                  <q-item-section>
                    <q-item-label 
                      class="text-body1"
                    >
                      {{homeBoard.progress.one}}
                    </q-item-label>
                  </q-item-section>
                </q-item>
                
                <q-item 
                  dense
                  v-if="homeBoard.progress.two"
                >
                  <q-item-section>
                    <q-item-label 
                      class="text-body1"
                    >
                      {{homeBoard.progress.two}}
                    </q-item-label>
                  </q-item-section>
                </q-item>
                
                <q-item 
                  dense
                  v-if="homeBoard.progress.three"
                >
                  <q-item-section>
                    <q-item-label 
                      class="text-body1"
                    >
                      {{homeBoard.progress.three}}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-4 q-pa-xs">
          <q-card 
            flat
            bordered
            square  
          >
            <q-card-section horizontal>
              <q-card-section class="col-2">
                <q-icon 
                  color="positive" 
                  name="thumb_up_alt" 
                />
              </q-card-section>
              <q-card-section>
                <div class="text-h6 q-mt-none">The Good Things</div>
                <div class="text-caption text-positive">Things to appreciate</div>
              </q-card-section>
            </q-card-section>

            <q-separator v-if="homeBoard.goodthings" inset />

            <q-card-section 
              class="q-mt-none"
              v-if="homeBoard.goodthings"  
            >
              <q-list>
                <q-item 
                  dense  
                >
                  <q-item-section>
                    <q-item-label 
                      class="text-body1"
                    >
                      {{homeBoard.goodthings.one}}
                    </q-item-label>
                  </q-item-section>
                </q-item>
                
                <q-item 
                  dense
                  v-if="homeBoard.goodthings.two"
                >
                  <q-item-section>
                    <q-item-label 
                      class="text-body1"
                    >
                      {{homeBoard.goodthings.two}}
                    </q-item-label>
                  </q-item-section>
                </q-item>
                
                <q-item 
                  dense
                  v-if="homeBoard.goodthings.three"
                >
                  <q-item-section>
                    <q-item-label 
                      class="text-body1"
                    >
                      {{homeBoard.goodthings.one}}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data: () => ({
    loading: false,
    showVocabDialog: false,
    dataReady: false
  }),
  components: {
    loading: () => import("../components/Shared/Loading")
  },
  computed: {
    ...mapGetters("auth", ["user"]),
    ...mapGetters("retrospect", ["homeBoard", "vocabGame"]),
  },
  methods: {
    ...mapActions("retrospect", ["fetchHomeBoard", "fetchUserWords"]),
    getHomeBoard() {
      this.loading = true
      this.fetchHomeBoard()
      .then(() => {
        this.fetchUserWords()
        .then(() => {
          this.dataReady = true
          this.loading = false
        })
        .catch(err => {
          console.log(0, err)
          this.loading = false
        })
      })
      .catch(err => {
        console.log(1, err)
        this.loading = false
      })
    }
  },
  mounted() {
    this.getHomeBoard()
  }
}
</script>