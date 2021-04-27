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
      const index = state.cart.findIndex(x => x.id === value.id)
      const price = parseInt(value.price)
      const quantity = parseInt(value.quantity)
      const ivaProduct = price * 0.19 * quantity
      const priceProduct = (price * quantity) + ivaProduct

      if (Number.isNaN(discount)) {
        state.cart[index].iva = ivaProduct
        state.cart[index].subtotal = priceProduct
      } else {
        if (Number.isNaN(quantity)) {
          state.cart[index].iva = 0
          state.cart[index].subtotal = 0
        } else {
          state.cart[index].discount = discount
          var discountProduct = (price * discount) / 100
          const baseIva = (price - discountProduct) * quantity
          const iva = baseIva * 0.19
          const subtotal = baseIva + iva
          state.cart[index].iva = Math.round(iva * 100) / 100
          state.cart[index].subtotal = Math.round(subtotal * 100) / 100
        }
      }
    },
    UPDATE_QUANTITY (state, value) {
      const price = parseInt(value.price)
      const discount = parseInt(value.discount)
      const quantity = parseInt(value.quantity)
      const ivaProduct = price * 0.19 * quantity
      const priceProduct = (price * quantity) + ivaProduct
      const index = state.cart.findIndex(x => x.id === value.id)

      if (Number.isNaN(quantity)) {
        state.cart[index].iva = 0
        state.cart[index].subtotal = 0
      } else {
        if (Number.isNaN(discount)) {
          state.cart[index].iva = ivaProduct
          state.cart[index].subtotal = priceProduct
        } else {
          state.cart[index].quantity = quantity
          state.cart[index].discount = discount
          var discountProduct = (price * discount) / 100
          const baseIva = (price - discountProduct) * quantity
          const iva = baseIva * 0.19
          const subtotal = baseIva + iva
          state.cart[index].iva = Math.round(iva * 100) / 100
          state.cart[index].subtotal = Math.round(subtotal * 100) / 100
        }
      }
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
