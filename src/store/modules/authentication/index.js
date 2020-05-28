const authAxios = require("../../../services/axios/authAxios")
const _ = require("../../../services/utils/utils")

const state = {
  user: {
    data: {},
    isLoggedIn: false
  }
}

const getters = {
  user: () => state.user
}

const actions = {
  registerUser({commit}, newUser) {
    return new Promise((resolve, reject) => {
      authAxios.post("/register-user", newUser)
      .then(res => {
        console.log(res.data.data)
        if (res.data.status === 400 || res.data.status === 500) {
          reject(res.data.message)
        }

        if (res.data.status === 200) {
          const userData = {
            ...res.data.data
          }
          
          const data = _.encryptObject(userData)
          _.storage.save("habitualaUserData", data)

          commit("login", {
            data: {
              username: userData.username,
              user: userData.userID,
              flag: userData.flag
            },
            isLoggedIn: true
          })

          resolve()
        }
      })
      .catch(err => {
        reject(err.message)
      })
    })
  },
  loginUser({commit}, user) {
    return new Promise((resolve, reject) => {
      authAxios.post("/login", user)
      .then(res => {
        if (res.data.status === 400 || res.data.status === 500) {
          reject(res.data.message)
        }

        if (res.data.status === 200) {
          const userData = {
            ...res.data.data
          }

          const data = _.encryptObject(userData)
          _.storage.save("habitualaUserData", data)

          console.log(res.data.data)
          
          commit("login", {
            data: {
              username: userData.username,
              user: userData.userID,
              flag: userData.flag
            },
            isLoggedIn: true
          })

          resolve()
        }
      })
      .catch(err => {
        reject(err.message)
      })
    })
  },
  logout({commit}) {
    return new Promise((resolve, reject) => {
      _.storage.remove("habitualaUserData")
      commit("logoutUser", {
        data: {},
        isLoggedIn: false
      })
      resolve()
    })
  },
  refreshUser({commit}) {
    if (!_.storage.get("habitualaUserData")) return
    let userData = _.storage.get("habitualaUserData")

    userData = _.decryptObject(userData)
    
    const user = {
      data: {
        username: userData.username,
        user: userData.userID,
        flag: userData.flag
      },
      isLoggedIn: true
    }
    
    commit("setUser", user)
  },
  updateUserDetails({commit}, update) {
    let habitualaUserData = ""
    if (_.storage.get("habitualaUserData")) {
      habitualaUserData = _.decryptObject(_.storage.get("habitualaUserData"))
    } else {
      commit("logoutUser", {
        data: {},
        isLoggedIn: false
      })
    }

    const options = {
      headers: {
        "Authorization": habitualaUserData.accessToken
      }
    }

    return new Promise((resolve, reject) => {
      authAxios.post("/edit", update, options)
      .then(res => {
        if (res.data.status === 401) {
          _.storage.remove("habitualaUserData")
          commit("logoutUser", {
            data: {},
            isLoggedIn: false
          })
          reject()
        }

        if (res.data.status === 400 || res.data.status === 500) {
          reject(res.data.message)
        }

        if (res.data.status === 200) {
          if (!_.storage.get("habitualaUserData")) return
          let userData = _.storage.get("habitualaUserData")

          userData = _.decryptObject(userData)
          
          const user = {
            data: {
              username: res.data.data.username,
              user: userData.userID,
              flag: userData.flag
            },
            isLoggedIn: true
          }
          
          userData.username = res.data.data.username
          
          const data = _.encryptObject(userData)
          _.storage.save("habitualaUserData", data)

          commit("setUser", user)
          resolve()
        }
      })
      .catch(err => {
        console.log(err)
        reject(err.message)
      })
    })
  },
  updatePassword({commit}, update) {
    let habitualaUserData = ""
    if (_.storage.get("habitualaUserData")) {
      habitualaUserData = _.decryptObject(_.storage.get("habitualaUserData"))
    } else {
      commit("logoutUser", {
        data: {},
        isLoggedIn: false
      })
    }

    const options = {
      headers: {
        "Authorization": habitualaUserData.accessToken
      }
    }

    return new Promise((resolve, reject) => {
      authAxios.post("/changepassword", update, options)
      .then(res => {
        if (res.data.status === 401) {
          _.storage.remove("habitualaUserData")
          commit("logoutUser", {
            data: {},
            isLoggedIn: false
          })
          reject()
        }

        if (res.data.status === 400 || res.data.status === 500) {
          reject(res.data.message)
        }

        if (res.data.status === 200) {
          resolve()
        }
      })
      .catch(err => {
        console.log(err)
        reject(err.message)
      })
    })
  },
}

const mutations = {
  login(state, user) {
    Object.assign(state.user, user)
  },
  setUser(state, user) {
    Object.assign(state.user, user)
  },
  logoutUser(state) {
    Object.assign(state.user, {})
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}