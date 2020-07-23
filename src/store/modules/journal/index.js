const graphqlAxios = require("../../../services/axios/graphqlAxios").graphqlAxios
const _ = require("../../../services/utils/utils")

const state = {
  userJournals: {
    journals: []
  }
}

const getters = {
  userJournals: () => state.userJournals
}

const actions = {
  addNewJournal({commit}, newJournal) {
    return new Promise((resolve, reject) => {
      
      let habitualaUserData = ""
      let options = {}
      if (_.storage.get("habitualaUserData")) {
        habitualaUserData = _.decryptObject(_.storage.get("habitualaUserData"))
        options.headers = {
          "Authorization": habitualaUserData.accessToken
        }
      }

      var body
      if (newJournal.type === "open") {
        body = {
          query: `
            mutation {
              createJournal(newJournal: {
                type: "${newJournal.type}",
                title: "${newJournal.title}",
                entry: "${newJournal.entry}",
                user: "${habitualaUserData.userID}"
              }) {
                _id
                type
                title
                entry
                createdAt
                updatedAt
              }
            }
          `,
          variables: {}
        }
      }

      if (newJournal.type === "reflection") {
        body = {
          query: `
            mutation {
              createJournal(newJournal: {
                type: "${newJournal.type}",
                title: "${newJournal.title}",
                entry: "${newJournal.entry}",
                rating: ${newJournal.rating},
                goodthings: "${newJournal.goodthings}",
                badthings: "${newJournal.badthings}",
                user: "${habitualaUserData.userID}"
              }) {
                _id
                type
                title
                rating
                goodthings
                badthings
                entry
                createdAt
                updatedAt
              }
            }
          `,
          variables: {}
        }
      }

      if (newJournal.type === "weeding") {
        body = {
          query: `
            mutation {
              createJournal(newJournal: {
                type: "${newJournal.type}",
                title: "${newJournal.title}",
                objective: "${newJournal.objective}",
                subjective: "${newJournal.subjective}",
                entry: "${newJournal.entry}",
                user: "${habitualaUserData.userID}"
              }) {
                _id
                type
                title
                objective
                subjective
                entry
                createdAt
                updatedAt
              }
            }
          `,
          variables: {}
        }
      }

      graphqlAxios.post("/graphql", body, options)
      .then(res => {
        commit("setNewJournal", res.data.data.createJournal)
        resolve()
      })
      .catch(err => {
        reject(err)
      })
    })
  },
  fetchUserJournals({commit}) {
    return new Promise((resolve, reject) => {
      
      let habitualaUserData = ""
      let options = {}
      if (_.storage.get("habitualaUserData")) {
        habitualaUserData = _.decryptObject(_.storage.get("habitualaUserData"))
        options.headers = {
          "Authorization": habitualaUserData.accessToken
        }
      }
      let body = {
        query: `
          query {
            fetchUserJournals(userInput: {
              user: "${habitualaUserData.userID}"
            }) {
              _id
              type
              title
              entry
              rating
              goodthings
              badthings
              objective
              subjective
              createdAt
              updatedAt
            }
          }
        `,
        variables: {}
      }

      graphqlAxios.post("/graphql", body, options)
      .then(res => {
        commit("setUserJournals", res.data.data.fetchUserJournals)
        resolve()
      })
      .catch(err => {
        reject(err)
      })
    })
  },
  deleteJournal({commit}, journal) {
    return new Promise((resolve, reject) => {
      
      let habitualaUserData = ""
      let options = {}
      if (_.storage.get("habitualaUserData")) {
        habitualaUserData = _.decryptObject(_.storage.get("habitualaUserData"))
        options.headers = {
          "Authorization": habitualaUserData.accessToken
        }
      }
      let body = {
        query: `
          mutation {
            deleteJournal(deleteJournalInput: {
              id: "${journal.id}",
              type: "${journal.type}"
            })
          }
        `,
        variables: {}
      }

      graphqlAxios.post("/graphql", body, options)
      .then(res => {
        commit("removeJournal", journal.id)
        resolve(journal)
      })
      .catch(err => {
        console.log(err)
        reject(err)
      })
    })
  }
}

const mutations = {
  setNewJournal(state, journal) {
    journal.color = journal.type === 'open' ? 'grey' : journal.type === 'weeding' ? 'blue' : 'red'
    journal.blurb = journal.entry.split(" ").splice(0, 15).join(" ")

    for (let [key, value] of Object.entries(journal)) {
      if (!value && key !== 'rating') delete journal[key]
    }
    journal.displayDate = new Date(journal.createdAt * 1).toDateString()
    state.userJournals.journals.push(journal)
  },
  setUserJournals(state, userJournals) {
    if (!userJournals) return
    userJournals.forEach(journal => {
      journal.color = journal.type === 'open' ? 'grey' : journal.type === 'weeding' ? 'blue' : 'red'
      journal.blurb = journal.entry.split(" ").splice(0, 10).join(" ")

      for (let [key, value] of Object.entries(journal)) {
        if (!value && key !== 'rating') delete journal[key]
      }
      
      journal.displayDate = new Date(journal.createdAt * 1).toDateString()
    })
    
    Object.assign(state.userJournals.journals, userJournals)
  },
  removeJournal(state, journalID) {
    const index = state.userJournals.journals.findIndex(journal => journal._id === journalID)

    state.userJournals.journals.splice(index, 1)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}