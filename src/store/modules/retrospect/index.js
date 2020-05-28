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
  userRetrospects: []
}

const getters = {
  userRetrospects: () => state.userRetrospects
}

const actions = {
  addJournal({commit}, journal) {
    return new Promise((resolve, reject) => {
      if (journal === "") {
        resolve()
        return
      }
      
      let body = {
        query: `
          mutation {
            createJournal(journalInput: {
              journal: "${journal}",
              user: "${habitualaUserData.userID}"
            }) {
              _id
            }
          }
        `,
        variables: {}
      }
      
      graphqlAxios.post("/graphql", body, options)
      .then(res => {
        resolve(res.data.data.createJournal)
      })
      .catch(err => {
        reject(err)
      })
    })
  },
  addWord({commit}, word) {
    return new Promise((resolve, reject) => {
      if (word.definition === "" || word.word === "") {
        resolve()
        return
      }
      
      let body = {
        query: `
          mutation {
            createWord(wordInput: {
              word: "${word.word}",
              definition: "${word.definition}",
              user: "${habitualaUserData.userID}"
            }) {
              _id
            }
          }
        `,
        variables: {}
      }
      graphqlAxios.post("/graphql", body, options)
      .then(res => {
        resolve(res.data.data.createWord)
      })
      .catch(err => {
        reject(err)
      })
    })
  },
  addQuote({commit}, quote) {
    return new Promise((resolve, reject) => {
      if (quote.text === "") {
        resolve()
        return
      }
      
      let body = {
        query: `
          mutation {
            createQuote(quoteInput: {
              text: "${quote.text}",
              author: "${quote.author}",
              user: "${habitualaUserData.userID}"
            }) {
              _id
            }
          }
        `,
        variables: {}
      }
      graphqlAxios.post("/graphql", body, options)
      .then(res => {
        resolve(res.data.data.createQuote)
      })
      .catch(err => {
        reject(err)
      })
    })
  },
  addProgress({commit}, progress) {
    return new Promise((resolve, reject) => {
      if (progress.one === "") {
        resolve()
        return
      }
      
      let body = {
        query: `
          mutation {
            createProgress(progressInput: {
              one: "${progress.one}",
              two: "${progress.two}",
              three: "${progress.three}",
              user: "${habitualaUserData.userID}"
            }) {
              _id
            }
          }
        `,
        variables: {}
      }
      graphqlAxios.post("/graphql", body, options)
      .then(res => {
        resolve(res.data.data.createProgress)
      })
      .catch(err => {
        reject(err)
      })
    })
  },
  addBadThings({commit}, badthings) {
    return new Promise((resolve, reject) => {
      if (badthings.one === "") {
        resolve()
        return
      }
      
      let body = {
        query: `
          mutation {
            createBadThings(badThingsInput: {
              one: "${badthings.one}",
              two: "${badthings.two}",
              three: "${badthings.three}",
              user: "${habitualaUserData.userID}"
            }) {
              _id
            }
          }
        `,
        variables: {}
      }
      graphqlAxios.post("/graphql", body, options)
      .then(res => {
        resolve(res.data.data.createBadThings)
      })
      .catch(err => {
        reject(err)
      })
    })
  },
  addGoodThings({commit}, goodthings) {
    return new Promise((resolve, reject) => {
      if (goodthings.one === "") {
        resolve()
        return
      }
      
      let body = {
        query: `
          mutation {
            createGoodThings(goodThingsInput: {
              one: "${goodthings.one}",
              two: "${goodthings.two}",
              three: "${goodthings.three}",
              user: "${habitualaUserData.userID}"
            }) {
              _id
            }
          }
        `,
        variables: {}
      }
      graphqlAxios.post("/graphql", body, options)
      .then(res => {
        resolve(res.data.data.createGoodThings)
      })
      .catch(err => {
        reject(err)
      })
    })
  },
  addRetrospect({commit}, retrospect) {
    return new Promise((resolve, reject) => {
      let body = {
        query: `
          mutation {
            createRetrospect(retrospectInput: {
              journal: "${retrospect.journal}",
              title: "${retrospect.title}",
              rating: ${retrospect.rating},
              goodthings: "${retrospect.goodthings}",
              badthings: "${retrospect.badthings}",
              progress: "${retrospect.progress}",
              quote: "${retrospect.quote}",
              word: "${retrospect.word}",
              user: "${habitualaUserData.userID}"
            }) {
              _id
            }
          }
        `,
        variables: {}
      }
      graphqlAxios.post("/graphql", body, options)
      .then(res => {
        resolve(res.data.data.createRetrospect)
      })
      .catch(err => {
        reject(err)
      })
    })
  },
  fetchUserRetrospects({commit}) {
    return new Promise((resolve, reject) => {
      let body = {
        query: `
          query {
            fetchUserRetrospects(fetchRetrospectsInput: {
              user: "${habitualaUserData.userID}"
            }) {
              _id
              title
              rating
              createdAt
              progress {
                _id
                one
                two
              }
              goodthings {
                one
                two
                three
              }
              badthings {
                one
                two
                three
              }
              journal {
                journal
              }
              quote {
                author
                text
              }
              word {
                word
                definition
              }
              displayDate
            }
          }
        `,
        variables: {}
      }

      graphqlAxios.post("/graphql", body, options)
      .then(res => {
        commit("setUserRetrospects", res.data.data.fetchUserRetrospects)
        resolve()
      })
      .catch(err => {
        reject(err)
      })
    })
  },
}

const mutations = {
  setUserRetrospects(state, userRetrospects) {
    Object.assign(state.userRetrospects, userRetrospects)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}