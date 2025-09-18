import { configureStore } from '../lib/reduxToolkit.js';
import uiReducer from './slices/uiSlice.js';
import authReducer from './slices/authSlice.js';

const store = configureStore({
  reducer: {
    ui: uiReducer,
    auth: authReducer,
  },
});

export default store;
