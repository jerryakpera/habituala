import Vue from 'vue'
import Vuex from 'vuex'

// import tasks from './store-tasks'
import auth from './modules/authentication/'
import retrospect from './modules/retrospect/'
import milestones from './modules/tasks/'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      // tasks,
      auth,
      retrospect,
      milestones
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
