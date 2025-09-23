import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  subtotal: 0,
  tax: 0,
  total: 0,
  itemCount: 0
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    updateSnapshot: (state, action) => {
      state.subtotal = action.payload.subtotal;
      state.tax = action.payload.tax;
      state.total = action.payload.total;
      state.itemCount = action.payload.itemCount;
    },
    resetSnapshot: () => initialState
  }
});

export const { updateSnapshot, resetSnapshot } = cartSlice.actions;
export default cartSlice.reducer;
