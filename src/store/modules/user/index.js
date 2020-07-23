const graphqlAxios = require("../../../services/axios/graphqlAxios").graphqlAxios
const _ = require("../../../services/utils/utils")

const state = {
  userProfile: {}
}

const getters = {
  userProfile: () => state.userProfile
}

const actions = {
  fetchUserProfile({commit}) {
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
            fetchUserProfile(userInput: {
              user: "${habitualaUserData.userID}"
            }) {
              userID
              email
              username
              createdDate
              flag
              tasks {
                all
                complete
                incomplete
              }
              journals {
                all
                open
                weeding
                reflection
              }
            }
          }
        `,
        variables: {}
      }

      graphqlAxios.post("/graphql", body, options)
      .then(res => {
        commit("setUserProfile", res.data.data.fetchUserProfile)
        resolve()
      })
      .catch(err => {
        reject(err)
      })
    })
  }
}

const mutations = {
  setUserProfile(state, userProfile) {
    Object.assign(state.userProfile, userProfile)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}