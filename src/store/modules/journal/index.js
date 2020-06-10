const graphqlAxios = require("../../../services/axios/graphqlAxios").graphqlAxios
const _ = require("../../../services/utils/utils")

let habitualaUserData = ""
let options = {}
if (_.storage.get("habitualaUserData")) {
  habitualaUserData = _.decryptObject(_.storage.get("habitualaUserData"))
  options.headers = {
    "Authorization": habitualaUserData.accessToken
  }
}

const state = {
  userJournals: {
    open: [],
    reflection: [],
    weeding: [],
  }
}

const getters = {
  userJournals: () => state.userJournals
}

const actions = {
  addNewOpenJournal({commit}, newJournal) {
    return new Promise((resolve, reject) => {
      let body = {
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
  addNewReflectionJournal({commit}, newJournal) {
    return new Promise((resolve, reject) => {
      let body = {
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
  addNewWeedingJournal({commit}, newJournal) {
    console.log("ADDING WEEDING JOURNAL")
    return new Promise((resolve, reject) => {
      let body = {
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
}

const mutations = {
  setNewJournal(state, journal) {
    state.userJournals[journal.type].push(journal)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}