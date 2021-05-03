import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cart: []
  },
  mutations: {
    ADD_TO_CART (state, value) {
      const index = state.cart.find(x => x.id === value.id)
      if (index) {
        const indice = state.cart.findIndex(x => x.id === value.id)
        console.log(!index)
        state.cart[indice].quantity += 1
        state.cart[indice].subtotal += state.cart[indice].finalPrice
        state.cart[indice].iva += state.cart[indice].ivaProduct
      } else {
        state.cart.push(value)
      }
    },
    REMOVE_TO_CART (state, value) {
      const index = state.cart.findIndex(x => x.id === value.id)
      state.cart.splice(index, 1)
    },
    UPDATE_ITEM (state, value) {
      const index = state.cart.findIndex(x => x.id === value.id)
      let discount
      if (parseFloat(value.quantity)) {
        if (parseFloat(value.discount)) {
          discount = parseInt(value.discount) / 100
        } else {
          discount = 0
        }
        const price = parseFloat(value.price) - (parseFloat(value.price) * discount)
        const quantity = parseInt(value.quantity)
        const iva = price * 0.19
        const finalPrice = price + iva
        state.cart[index].quantity = quantity
        state.cart[index].subtotal = quantity * finalPrice
        state.cart[index].finalPrice = finalPrice
        state.cart[index].ivaProduct = iva
        state.cart[index].iva = quantity * iva
      } else {
        state.cart[index].subtotal = 0
        state.cart[index].iva = 0
      }
    }
  },
  actions: {
    addToCart ({ commit }, product) {
      commit('ADD_TO_CART', product)
    },
    removeToCart ({ commit }, product) {
      commit('REMOVE_TO_CART', product)
    },
    updateItem ({ commit }, product) {
      commit('UPDATE_ITEM', product)
    }
  },
  modules: {
  }
})
