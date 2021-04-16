import Vue from 'vue'
import Vuex from 'vuex'
import categorias from "./modules/categorias.js";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    categorias
  }
})