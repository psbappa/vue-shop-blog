import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0,
    products: [],
    cart: []
  },
  mutations: {
    GET_PRODUCTS: (state, products) => {
      console.log('mutations', products)
      state.products = products;
    },
  },
  actions: {
    GET_PRODUCTS({ commit }) {
      return axios.get('http://127.0.0.1:8000/api/products').then(res => {
        commit('GET_PRODUCTS', res.data['hydra:member'])
      })
      .catch(err => {
        console.log('Error found: ', err)
      });
    }
  },
});