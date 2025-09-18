import { createSlice } from '../../lib/reduxToolkit.js';

const initialState = {
  data: null,
};

const defaultHero = {
  videoUrl: '',
  headline: '',
  subheadline: '',
  ctaText: '',
  ctaTarget: '#',
};

const defaultMeta = {
  brand: '',
  tagline: '',
};

const defaultContactDetails = {
  address: '',
  phone: '',
  email: '',
  hours: [],
};

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    setContent: (state, action) => {
      state.data = action.payload;
    },
    clearContent: (state) => {
      state.data = null;
    },
  },
});

export const { setContent, clearContent } = contentSlice.actions;

export const selectContent = (state) => state.content.data;

export const selectNavigation = (state) => selectContent(state)?.navigation ?? [];

export const selectMeta = (state) => ({
  ...defaultMeta,
  ...(selectContent(state)?.meta ?? {}),
});

export const selectHomeContent = (state) => {
  const home = selectContent(state)?.home;
  return {
    hero: { ...defaultHero, ...(home?.hero ?? {}) },
    highlights: home?.highlights ?? [],
    testimonials: home?.testimonials ?? [],
  };
};

export const selectServicesContent = (state) => {
  const services = selectContent(state)?.services;
  return {
    intro: services?.intro ?? '',
    list: services?.list ?? [],
  };
};

export const selectGalleryContent = (state) => {
  const gallery = selectContent(state)?.gallery;
  return {
    intro: gallery?.intro ?? '',
    items: gallery?.items ?? [],
  };
};

export const selectContactContent = (state) => {
  const contact = selectContent(state)?.contact;
  return {
    intro: contact?.intro ?? '',
    details: { ...defaultContactDetails, ...(contact?.details ?? {}) },
  };
};

export default contentSlice.reducer;
