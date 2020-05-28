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
  milestones: {},
  tasks: []
}

const getters = {
  milestones: () => state.milestones,
  tasks: () => state.tasks
}

const actions = {
  createTask({commit}, task) {
    return new Promise((resolve, reject) => {
      let body = {
        query: `
          mutation {
            createTask(taskInput: {
              name: "${task.name}",
              user: "${habitualaUserData.userID}",
              milestone: "${task.milestoneID}",
              dueTime: "${task.dueTime}",
              dueDate: "${task.dueDate}",
            }) {
              _id
              name
              user
              completed
              dueTime
              dueDate
              createdAt
              updatedAt
            }
          }
        `,
        variables: {}
      }
      
      graphqlAxios.post("/graphql", body, options)
      .then(res => {
        commit("addTask", {task: res.data.data.createTask, milestoneID: task.milestoneID})
        // commit("addMilestone", res.data.data.createTask)
        // resolve(res.data.data.createMilestone)
      })
      .catch(err => {
        reject(err)
      })
    })
  },
  addMilestone({commit}, milestone) {
    return new Promise((resolve, reject) => {
      
      let body = {
        query: `
          mutation {
            createMilestone(milestoneInput: {
              name: "${milestone.name}",
              user: "${habitualaUserData.userID}",
              group: ${milestone.group}
            }) {
              _id
              name
              user
              group
              createdAt
              updatedAt
            }
          }
        `,
        variables: {}
      }
      
      graphqlAxios.post("/graphql", body, options)
      .then(res => {
        resolve(res.data.data.createMilestone)
      })
      .catch(err => {
        reject(err)
      })
    })
  },
  deleteMilestone({commit}, milestoneID) {
    return new Promise((resolve, reject) => {
      let body = {
        query: `
          mutation {
            deleteMilestone(deleteMilestoneInput: {
              milestoneID: "${milestoneID}"
            })
          }
        `,
        variables: {}
      }
      
      graphqlAxios.post("/graphql", body, options)
      .then(res => {
        commit("removeMilestone", milestoneID)
        // commit("addMilestone", res.data.data.createMilestone)
        // resolve(res.data.data.createMilestone)
      })
      .catch(err => {
        reject(err)
      })
    })
  },
  fetchMilestones({commit}) {
    return new Promise((resolve, reject) => {
      let body = {
        query: `
          query {
            milestones(getMilestonesInput: {
              user: "${habitualaUserData.userID}"
            }) {
              _id
              name
              group
              user
              tasks {
                _id
                name
                user
                completed
                dueTime
                dueDate
                createdAt
                updatedAt
              }
              createdAt
              updatedAt
            }
          }
        `,
        variables: {}
      }

      graphqlAxios.post("/graphql", body, options)
      .then(res => {
        commit("setMilestones", res.data.data.milestones)
        resolve()
      })
      .catch(err => {
        reject(err)
      })
    })
  },
}

const mutations = {
  setMilestones(state, milestones) {
    const returnedMilestones = {
      0: [],
      1: [],
      2: []
    }
    milestones.forEach(milestone => {
      if (milestone.group === 0) returnedMilestones[0].push(milestone)
      if (milestone.group === 1) returnedMilestones[1].push(milestone)
      if (milestone.group === 2) returnedMilestones[2].push(milestone)
    })
    
    Object.assign(state.milestones, returnedMilestones)
  },
  // addTask(state, payload) {
  //   state.milestones.find(milestone => {
  //     milestone._id === payload.milestoneID
  //   }).tasks.push(payload.tasks)
  // },
  removeMilestone(state, milestoneID) {
    const index = state.milestones.findIndex(milestone => {
      return milestone._id === milestoneID
    })

    state.milestones.splice(index, 1)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}