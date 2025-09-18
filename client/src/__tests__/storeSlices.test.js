/* eslint-env jest */

import store from '../store/index.js';
import { openGalleryModal, closeGalleryModal } from '../store/slices/uiSlice.js';
import { setGuestProfile, clearGuestProfile } from '../store/slices/authSlice.js';

describe('Redux Toolkit slices', () => {
  it('manages gallery modal state', () => {
    const media = { id: 'sample', caption: 'Sample' };
    store.dispatch(openGalleryModal(media));
    const state = store.getState();
    expect(state.ui.galleryModalOpen).toBe(true);
    expect(state.ui.selectedMedia).toEqual(media);

    store.dispatch(closeGalleryModal());
    const closed = store.getState();
    expect(closed.ui.galleryModalOpen).toBe(false);
    expect(closed.ui.selectedMedia).toBe(null);
  });

  it('stores guest profile details', () => {
    const profile = { name: 'Guest', tier: 'Elite' };
    store.dispatch(setGuestProfile(profile));
    let state = store.getState();
    expect(state.auth.isAuthenticated).toBe(true);
    expect(state.auth.guestProfile).toEqual(profile);

    store.dispatch(clearGuestProfile());
    state = store.getState();
    expect(state.auth.isAuthenticated).toBe(false);
    expect(state.auth.guestProfile).toBe(null);
  });
});
