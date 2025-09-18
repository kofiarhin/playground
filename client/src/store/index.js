import { configureStore } from '../lib/reduxToolkit.js';
import uiReducer from './slices/uiSlice.js';
import authReducer from './slices/authSlice.js';
import contentReducer from './slices/contentSlice.js';

const store = configureStore({
  reducer: {
    ui: uiReducer,
    auth: authReducer,
    content: contentReducer,
  },
});

export default store;
