import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: [],
  }),
  getters: {
    cartItemsAdded(state) {
      return state.cartItems
    },
  },
  actions: {
    addCartItem(cartItem) {
      const cartItemIds = this.cartItems.map(c => c.cartItemId).filter(id => typeof id === 'number')
      this.cartItems.push({
        cartItemIds: cartItemIds.length > 0 ? (Math.max(...cartItemIds) + 1) : 1,
        ...cartItem
      })
    },
    removeCartItem(index) {
      this.cartItems.splice(index, 1)
    },
    clearCart() {
      this.$reset()
    }
  }
})
