import { RootState } from '@/store'
import { Cart, CartItem } from '@/types/carts.type'
import { emptyCart } from '@/utils/samples/carts.sample'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const syncLocalStorage = (cart: Cart) => {
  localStorage.setItem('cart', JSON.stringify(cart))
}

const getLocalStorageCartData = (): Cart => {
  return JSON.parse(localStorage.getItem('cart') || JSON.stringify(emptyCart)) as Cart
}

export type CartState = Cart

const initialState: CartState = getLocalStorageCartData()

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const { productId, quantity } = action.payload
      let existed = false
      for (let i = 0; i < state.items.length; i++) {
        if (state.items[i].productId === productId) {
          state.items[i].quantity += quantity
          existed = true
          break
        }
      }
      if (!existed) {
        state.items.push({ productId: productId, quantity: quantity })
      }
      syncLocalStorage(state)
    },
    updateQuantity: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
      for (let i = 0; i < state.items.length; i++) {
        if (state.items[i].productId === action.payload.productId) {
          state.items[i].quantity = action.payload.quantity
          break
        }
      }
      syncLocalStorage(state)
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = [...state.items.filter((item) => item.productId !== action.payload)]
      syncLocalStorage(state)
    },
    clearCart: (state) => {
      state.items = []
      syncLocalStorage(state)
    },
  },
})

export const selectCart = (state: RootState) => state.cart

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions
export default cartSlice.reducer
