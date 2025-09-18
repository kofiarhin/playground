import { createSlice } from '../../lib/reduxToolkit.js';

const initialState = {
  isAuthenticated: false,
  guestProfile: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setGuestProfile: (state, action) => {
      state.isAuthenticated = true;
      state.guestProfile = action.payload;
    },
    clearGuestProfile: (state) => {
      state.isAuthenticated = false;
      state.guestProfile = null;
    },
  },
});

export const { setGuestProfile, clearGuestProfile } = authSlice.actions;

export default authSlice.reducer;
