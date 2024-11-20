import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart(state, action) {
      const itemToAdd = action.payload;
      const existingItem = state.find(item => item.id === itemToAdd.id); //checki if it is item.id or item.product_id
      if (existingItem) {
        existingItem.quantity += itemToAdd.quantity;
      } else {
        state.push({ ...itemToAdd, quantity: itemToAdd.quantity || 1 });
      }
    },
    removeFromCart(state, action) {
      const itemIdToRemove = action.payload;
      console.log(state)
      return state.filter(item => item.id !== itemIdToRemove);//checki if it is item.id or item.product_id
    },
    clearCart(state) {
      return [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
