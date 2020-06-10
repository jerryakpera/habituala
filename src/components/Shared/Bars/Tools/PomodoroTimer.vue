<template>
  <q-card 
    class="my-card" 
    flat
    style="width: 300px"
  >
    <q-card-actions>
      <q-btn 
        flat 
        label="Work"
        @click="resetToWork()"
      />
      <q-btn
        flat
        label="Break"
        @click="resetToRest()"
      />
      <q-btn
        flat
        label="Rest"
        @click="resetToLongRest()"
      />
    </q-card-actions>
    <q-separator />
    <q-card-section class="q-pt-xs">
      <div class="text-overline text-red">Pomodoro Timer</div>
      <div class="text-h2 text-bold q-mt-sm q-mb-xs">
        <span>
          {{pomodoro.minutes}}
        </span>
        <span>
          {{pomodoro.seconds}}
        </span>
      </div>
    </q-card-section>

    <q-separator />

    <q-card-actions>
      <q-btn 
        flat 
        round 
        icon="play_arrow"
        class="text-positive"
        @click="play()"
      />
      <q-btn 
        flat 
        round 
        icon="stop" 
        class="text-negative"
        @click="stopTimer()"
      />
      <q-btn 
        flat 
        round 
        icon="replay" 
        class="text-secondary"
        @click="resetToWork()"
      />
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  data: () => ({
    pomodoro: {
      duration: {
        work: 1500,
        rest: 300,
        longRest: 1500
      },
      minutes: 24,
      seconds: 59,
      secondsLeft: 0,
      timer: ""
    },
    phase: "work"
  }),
  methods: {
    stopTimer() {
      if(!this.pomodoro.timer == "") window.clearInterval(this.pomodoro.timer)
    },
    resetToWork() {
      this.phase = "work"
      this.pomodoro.secondsLeft = this.pomodoro.duration.work
      this.displayTimer(this.pomodoro.duration.work)
    },
    resetToRest() {
      this.phase = "break"
      this.pomodoro.secondsLeft = this.pomodoro.duration.rest
      this.displayTimer(this.pomodoro.duration.rest)
    },
    resetToLongRest() {
      this.phase = "rest"
      this.pomodoro.secondsLeft = this.pomodoro.duration.longRest
      this.displayTimer(this.pomodoro.duration.longRest)
    },
    play() {
      this.startTimer()
    },
    startTimer() {
      const seconds = this.pomodoro.secondsLeft
      const now = Date.now()
      const finish = now + seconds * 1000

      this.pomodoro.timer = window.setInterval(() => {
        const secondsLeft = Math.round((finish - Date.now()) / 1000)
        // Check if timer should stop
        
        
        if (secondsLeft <= 0) {
          if (this.phase === "work") {
            this.showNotif("positive", "Great work! Take a break", "thumb_alt_up")
            this.stopTimer()
            return
          } else if (this.phase === "break") {
            this.showNotif("positive", "Back to work!", "thumb_alt_up")
            this.stopTimer()
            return
          } else {
            this.showNotif("positive", "Back to work!", "thumb_alt_up")
            this.stopTimer()
            return
          }
        }
        
        this.displayTimer(secondsLeft)
      }, 1000)
    },
    displayTimer(seconds) {
      this.pomodoro.minutes = Math.floor(seconds / 60)
      this.pomodoro.seconds = seconds % 60 == 0 ? "00" : seconds % 60
    },
    showNotif (type, message, icon) {
      const snackbar = {
        type,
        message,
        icon
      }
      this.$q.notify(snackbar)
    }
  },
  mounted() {
    this.resetToWork()
  }
}
</script>