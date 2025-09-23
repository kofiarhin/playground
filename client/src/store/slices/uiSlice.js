import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartDrawerOpen: false,
  theme: 'light',
  notification: null
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleCartDrawer: (state) => {
      state.cartDrawerOpen = !state.cartDrawerOpen;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    showNotification: (state, action) => {
      state.notification = action.payload;
    },
    clearNotification: (state) => {
      state.notification = null;
    }
  }
});

export const { toggleCartDrawer, setTheme, showNotification, clearNotification } = uiSlice.actions;
export default uiSlice.reducer;
