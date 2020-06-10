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
  userTasks: [],
}

const getters = {
  milestones: () => state.milestones,
  userTasks: () => state.userTasks
}

const actions = {
  createTask({}, task) {
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
        resolve(res.data.data.createTask)
      })
      .catch(err => {
        reject(err)
      })
    })
  },
  addMilestone({}, milestone) {
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
  deleteMilestone({}, milestoneID) {
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
        resolve()
      })
      .catch(err => {
        reject(err)
      })
    })
  },
  editMilestone({}, milestone) {
    return new Promise((resolve, reject) => {
      let body = {
        query: `
          mutation {
            editMilestone(editMilestoneInput: {
              milestoneID: "${milestone.milestoneID}",
              name: "${milestone.name}",
              group: ${milestone.group}
            }) {
              _id
              user
              name
              group
              tasks {
                _id
                name
                user
                completed
                dueTime
                dueDate
                remainingDays
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
        resolve(res.data.data.editMilestone)
      })
      .catch(err => {
        reject(err)
      })
    })
  },
  deleteTask({}, deleteTask) {
    return new Promise((resolve, reject) => {
      let body = {
        query: `
          mutation {
            deleteTask(deleteTaskInput: {
              milestoneID: "${deleteTask.milestoneID}",
              taskID: "${deleteTask.taskID}"
            })
          }
        `,
        variables: {}
      }
      
      graphqlAxios.post("/graphql", body, options)
      .then(res => {
        resolve()
      })
      .catch(err => {
        reject(err)
      })
    })
  },
  updateTask({}, task) {
    return new Promise((resolve, reject) => {
      let body = {
        query: `
          mutation {
            editTask(editTaskInput: {
              _id: "${task._id}",
              name: "${task.name}",
              completed: ${task.completed},
              dueTime: "${task.dueTime}",
              dueDate: "${task.dueDate}",
              user: "${habitualaUserData.userID}"
            }) {
              _id
              name
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
        resolve(res.data.data.editTask)
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
                remainingDays
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
  changeMilestoneGroup({commit}, milestone) {
    commit("changeMilestoneGroup", milestone)
  }
}

const mutations = {
  setMilestones(state, milestones) {
    const userTasks = []
    milestones.forEach(milestone => {
      milestone.tasks.forEach(task => {
        if (task.remainingDays <= 3) {
          task.milestoneID = milestone._id
          userTasks.push(task)
        }
      })
    })
    state.userTasks = userTasks
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
  changeMilestoneGroup(state, milestone) {
    const index = state.milestones[milestone.oldGroup].findIndex(m => m._id == milestone.milestone._id)

    state.milestones[milestone.oldGroup].splice(index, 1)
    state.milestone[milestone.milestone.group].push(milestone.milestone)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}