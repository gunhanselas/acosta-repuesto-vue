import Vue from 'vue'
import Vuex from 'vuex'
import categorias from "./modules/categorias.js";
import productos from "./modules/productos.js";
import marcas from "./modules/marcas.js";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    categorias,
    productos,
    marcas
  }
})