import { createSlice } from '../../lib/reduxToolkit.js';

const initialState = {
  galleryModalOpen: false,
  selectedMedia: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openGalleryModal: (state, action) => {
      state.galleryModalOpen = true;
      state.selectedMedia = action.payload;
    },
    closeGalleryModal: (state) => {
      state.galleryModalOpen = false;
      state.selectedMedia = null;
    },
  },
});

export const { openGalleryModal, closeGalleryModal } = uiSlice.actions;

export default uiSlice.reducer;
