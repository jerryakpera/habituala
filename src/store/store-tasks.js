import Vue from "vue";
import { uid } from 'quasar'

const state = {
  tasks: {
    "id1": {
      name: "Go to shop",
      completed: false,
      dueDate: "26/05/2020",
      dueTime: "18:30"
    },
    "id2": {
      name: "Buy watermelons",
      completed: false,
      dueDate: "27/05/2020",
      dueTime: "19:00"
    },
    "id3": {
      name: "Take supplements",
      completed: false,
      dueDate: "28/05/2020",
      dueTime: "19:30"
    }
  }
}

const getters = {
  tasksTodo: () => {
    let tasks = {}
    Object.keys(state.tasks).forEach(key => {
      let task = state.tasks[key]
      if (!task.completed) {
        tasks[key] = task
      }
    })
    return tasks
  },
  tasksCompleted: () => {
    let tasks = {}
    Object.keys(state.tasks).forEach(key => {
      let task = state.tasks[key]
      if (task.completed) {
        tasks[key] = task
      }
    })
    return tasks
  },
}

const actions = {
  updateTask({ commit }, payload) {
    commit("updateTask", payload)
  },
  deleteTask({ commit }, id) {
    commit("deleteTask", id)
  }
}

const mutations = {
  updateTask(state, payload) {
    Object.assign(state.tasks[payload.id], payload.updates)
  },
  deleteTask(state, id) {
    Vue.delete(state.tasks, id)
  },
  addTask(state, payload) {
    Vue.set(state.tasks, payload.id, payload.task)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}