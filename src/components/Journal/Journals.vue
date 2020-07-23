<template>
  <div>
    <q-table
      grid
      :card-container-class="cardContainerClass"
      title="My Journals"
      :data="journals"
      :columns="columns"
      row-key="name"
      :filter="filter"
      hide-header
      :pagination.sync="pagination"
      :rows-per-page-options="rowsPerPageOptions"
    >
      <template v-slot:top-right>
        <q-input
          borderless
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template v-slot:item="props">
        <div class="q-pa-xs col-xs-12 journal">
          <q-card
            class="my-card"
            square
            flat
            bordered
            color="bg-primary"
          >
            <q-badge 
              :color="props.row.color + '-10'" 
              text-color="white" 
              :label="props.row.type"
            />
            <q-card-section horizontal>
              <q-card-actions vertical class="justify-around q-px-md">
                <q-btn
                  flat
                  round
                  color="primary"
                  icon="pageview" 
                  size="sm"
                  @click="openSingleJournal(props.row)"
                />
                <q-btn
                  flat
                  round
                  color="red"
                  icon="delete" 
                  size="xs"
                  @click="promptToDelete(props.row)"
                />
              </q-card-actions>
              <q-card-section
                class="text-overline"
              >
                {{props.row.displayDate}}
                <br>
                <strong
                  class="text-h6"
                >
                  {{ props.row.title }}
                </strong>
                <div class="text-subtitle1">{{ props.row.blurb }}</div>
                <q-rating
                  v-if="props.row.type === 'reflection'"
                  v-model="props.row.rating"
                  size="1.11em"
                  :max="5"
                  color="yellow"
                />
              </q-card-section>
            </q-card-section>
          </q-card>
        </div>
      </template>
    </q-table>
    <q-dialog 
      v-model="showJournalDialog"
      transition-show="slide-up"
      maximized
      transition-hide="slide-down"
    >
      <singlejournal
        :journal="journal"
        @closeDialog="showJournalDialog = false"
      />
    </q-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data () {
    return {
      showJournalDialog: false,
      journal: {},
      filter: '',
      pagination: {
        page: 1,
        rowsPerPage: this.getItemsPerPage()
      },
      columns: [
        { name: 'title', label: 'Title', field: 'title' },
        { name: 'entry', label: 'Journal Entry', field: 'entry' },
        { name: 'type', label: 'Journal Type', field: 'type' },
      ]
    }
  },
  props: {
    journals: {
      type: Array,
      required: true
    }
  },
  computed: {
    cardContainerClass () {
      if (this.$q.screen.gt.xs) {
        return 'grid-masonry grid-masonry--' + (this.$q.screen.gt.sm ? '3' : '2')
      }

      return void 0
    },

    rowsPerPageOptions () {
      if (this.$q.screen.gt.xs) {
        return this.$q.screen.gt.sm ? [ 3, 6, 9 ] : [ 3, 6 ]
      }

      return [ 3 ]
    }
  },
  components: {
    singlejournal: () => import("./SingleJournal")
  },

  watch: {
    '$q.screen.name' () {
      this.pagination.rowsPerPage = this.getItemsPerPage()
    }
  },

  methods: {
    ...mapActions("journal", ["deleteJournal"]),
    getItemsPerPage () {
      const { screen } = this.$q
      if (screen.lt.sm) {
        return 3
      }
      if (screen.lt.md) {
        return 6
      }
      return 6
    },
    openSingleJournal(journal) {
      this.journal = journal
      this.showJournalDialog = true
    },
    promptToDelete(deleteJournal) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Really, delete?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.removeJournal(deleteJournal)
      })
    },
    removeJournal(journal) {
      const journalToRemove = {
        id: journal._id,
        type: journal.type
      }

      this.deleteJournal(journalToRemove)
      .then(() => {
        
      })
      .catch(err => {
      })
    }
  }
}
</script>

<style lang="scss" scoped>

.grid-masonry {
	flex-direction: column;
	height: 700px;
}

.grid-masonry--2 > div:nth-child(2n + 1) {
	order: 1;
}

.grid-masonry--2 > div:nth-child(2n) {
	order: 2;
}

.grid-masonry--2:before {
	content: '';
	flex: 1 0 100% !important;
	width: 0 !important;
	order: 1;
}

.grid-masonry--3 > div:nth-child(3n + 1) {
	order: 1;
}

.grid-masonry--3 > div:nth-child(3n + 2) {
	order: 2;
}

.grid-masonry--3 > div:nth-child(3n) {
	order: 3;
}

.grid-masonry--3:before, .grid-masonry--3:after {
	content: '';
	flex: 1 0 100% !important;
	width: 0 !important;
	order: 2;
}
</style>