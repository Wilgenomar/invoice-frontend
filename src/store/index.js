import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cart: []
  },
  mutations: {
    ADD_TO_CART (state, value) {
      state.cart.push(value)
    },
    UPDATE_DISCOUNT (state, value) {
      const discount = parseInt(value.discount)
      const quantity = parseInt(value.quantity)
      const price = parseInt(value.price)

      const index = state.cart.findIndex(x => x.id === value.id)
      state.cart[index].discount = discount

      state.cart[index].discount = discount
      var discountProduct = (price * discount) / 100
      const baseIva = (price - discountProduct) * quantity
      const iva = baseIva * 0.19
      state.cart[index].iva = iva
      state.cart[index].subtotal = baseIva + iva
    },
    UPDATE_QUANTITY (state, value) {
      const discount = parseInt(value.discount)
      const quantity = parseInt(value.quantity)
      const price = parseInt(value.price)

      const index = state.cart.findIndex(x => x.id === value.id)
      state.cart[index].quantity = quantity

      state.cart[index].discount = discount
      var discountProduct = (price * discount) / 100
      const baseIva = (price - discountProduct) * quantity
      const iva = baseIva * 0.19
      state.cart[index].iva = iva
      state.cart[index].subtotal = baseIva + iva
    }
  },
  actions: {
    addToCart ({ commit }, product) {
      commit('ADD_TO_CART', product)
    },
    updateQuantity ({ commit }, product) {
      commit('UPDATE_QUANTITY', product)
    },
    updateDiscount ({ commit }, product) {
      commit('UPDATE_DISCOUNT', product)
    }
  },
  modules: {
  }
})
