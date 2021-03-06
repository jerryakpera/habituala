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
  userRetrospects: [],
  homeBoard: {},
  vocabGame: {
    words: {}
  },
  words: [],
  userWords: []
}

const getters = {
  userRetrospects: () => state.userRetrospects,
  homeBoard: () => state.homeBoard,
  vocabGame: () => state.vocabGame,
  words: () => state.words,
  userWords: () => state.userWords
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
        commit("addVocabToUser", res.data.data.createWord)
        commit("addVocab", res.data.data.createWord)
        resolve()
      })
      .catch(err => {
        reject(err)
      })
    })
  },
  addVocabToUserList({commit}, vocabID) {
    return new Promise((resolve, reject) => {
      let body = {
        query: `
          mutation {
            addVocabToUser(userVocabInput: {
              vocab: "${vocabID}",
              user: "${habitualaUserData.userID}"
            }) {
              _id
              word
              definition
              createdAt
              updatedAt
            }
          }
        `,
        variables: {}
      }
      graphqlAxios.post("/graphql", body, options)
      .then(res => {
        commit("addVocabToUser", res.data.data.addVocabToUser)

        resolve(res.data.data.addVocabToUser)
      })
      .catch(err => {
        console.log(err)
        reject(err)
      })
    })
  },
  removeVocabFromUser({commit}, vocabID) {
    return new Promise((resolve, reject) => {
      let body = {
        query: `
          mutation {
            removeVocabFromUser(userVocabInput: {
              vocab: "${vocabID}",
              user: "${habitualaUserData.userID}"
            }) {
              _id
              word
              definition
              createdAt
              updatedAt
            }
          }
        `,
        variables: {}
      }
      graphqlAxios.post("/graphql", body, options)
      .then(res => {
        commit("removeVocabFromUser", res.data.data.removeVocabFromUser)

        resolve(res.data.data.addVocabToUser)
      })
      .catch(err => {
        console.log(err)
        reject(err)
      })
    })
  },
  filterWords({commit}, search) {
    commit("filterWords", search)
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
  fetchHomeBoard({commit}) {
    return new Promise((resolve, reject) => {
      let body = {
        query: `
          query {
            fetchHomeBoard(fetchHomeBoardInput: {
              user: "${habitualaUserData.userID}"
            }) {
              _id
              journal
              progress {
                one
                two
                three
              }
              goodthings {
                one
                two
                three
              }
              title
              displayDate
            }
          }
        `,
        variables: {}
      }

      graphqlAxios.post("/graphql", body, options)
      .then(res => {
        commit("setHomeBoard", res.data.data.fetchHomeBoard)
        resolve()
      })
      .catch(err => {
        reject(err)
      })
    })
  },
  fetchUserWords({commit}) {
    return new Promise((resolve, reject) => {
      let body = {
        query: `
          query {
            fetchUserWords(fetchUserWordsInput: {
              user: "${habitualaUserData.userID}"
            }) {
              _id
              word
              definition
              createdAt
              updatedAt
            }
          }
        `,
        variables: {}
      }

      graphqlAxios.post("/graphql", body, options)
      .then(res => {
        commit("setUserWords", res.data.data.fetchUserWords)
        resolve()
      })
      .catch(err => {
        reject(err)
      })
    })
  },
  fetchWords({commit}) {
    return new Promise((resolve, reject) => {
      let body = {
        query: `
          query {
            fetchWords {
              _id
              word
              definition
              createdAt
              updatedAt
            }
          }
        `,
        variables: {}
      }

      graphqlAxios.post("/graphql", body, options)
      .then(res => {
        commit("setWords", res.data.data.fetchWords)
        resolve()
      })
      .catch(err => {
        reject(err)
      })
    })
  }
}

const mutations = {
  setUserRetrospects(state, userRetrospects) {
    Object.assign(state.userRetrospects, userRetrospects)
  },
  setHomeBoard(state, homeBoard) {
    Object.assign(state.homeBoard, homeBoard)
  },
  setUserWords(state, userWords) {
    if(!userWords) return
    state.userWords = userWords
    const vocabGame = {
      lives: 3,
      score: 0,
      words: []
    }

    userWords.forEach((word, i) => {
      const vocabWord = {
        flag: 0,
        word: word.word,
        definition: word.definition
      }
      
      vocabGame.words.push(vocabWord)
    })

    Object.assign(state.vocabGame, vocabGame)
  },
  setWords(state, words) {
    state.words = words
  },
  addVocabToUser(state, vocab) {
    state.userWords.push(vocab)
  },
  removeVocabFromUser(state, removedVocab) {
    const index = state.userWords.findIndex(vocab => vocab._id == removedVocab._id)

    state.userWords.splice(index, 1)
  },
  addVocab(state, vocab) {
    state.words.push(vocab)
  },
  filterWords(state, search) {
    state.words = state.words.filter(vocab => {
      if(vocab.word.includes(search) || vocab.definition.includes(search)) {
        return vocab
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}