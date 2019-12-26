import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getter'
import menu from './module/menu'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    menu,
  },
  getters
})

export default store
