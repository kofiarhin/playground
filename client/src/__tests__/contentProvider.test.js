/* eslint-env jest */

import contentReducer, {
  selectContactContent,
  selectGalleryContent,
  selectHomeContent,
  selectMeta,
  selectNavigation,
  selectServicesContent,
  setContent,
} from '../store/slices/contentSlice.js';

const createState = (action) => ({ content: contentReducer(undefined, action) });

describe('contentSlice', () => {
  it('stores fetched content payload', () => {
    const payload = { meta: { brand: 'LuxeAura Salon' } };
    const state = contentReducer(undefined, setContent(payload));

    expect(state.data).toEqual(payload);
  });

  it('exposes stored values through selectors', () => {
    const payload = {
      meta: { brand: 'LuxeAura Salon', tagline: 'Opulence redefined' },
      navigation: [
        { path: '/', label: 'Home' },
        { path: '/services', label: 'Services' },
      ],
      home: {
        hero: { headline: 'Radiance Awaits' },
        highlights: [{ title: 'Artistry' }],
        testimonials: [{ guest: 'Celeste', quote: 'Divine.' }],
      },
      services: { intro: 'Begin your ritual', list: [{ name: 'Luxe Facial' }] },
      gallery: { intro: 'Awaken your senses', items: [{ id: '1', caption: 'Luxe', imageUrl: '#' }] },
      contact: {
        intro: 'Reach our concierge',
        details: { address: '123 Aura Ave', phone: '123-456', email: 'hello@luxeaura.com', hours: ['Daily'] },
      },
    };

    const state = createState(setContent(payload));

    expect(selectMeta(state)).toEqual(payload.meta);
    expect(selectNavigation(state)).toEqual(payload.navigation);
    expect(selectHomeContent(state)).toEqual({
      hero: {
        videoUrl: '',
        headline: 'Radiance Awaits',
        subheadline: '',
        ctaText: '',
        ctaTarget: '#',
      },
      highlights: payload.home.highlights,
      testimonials: payload.home.testimonials,
    });
    expect(selectServicesContent(state)).toEqual(payload.services);
    expect(selectGalleryContent(state)).toEqual(payload.gallery);
    expect(selectContactContent(state)).toEqual(payload.contact);
  });

  it('provides safe defaults when content has not been loaded', () => {
    const state = createState({ type: '@@INIT' });

    expect(selectMeta(state)).toEqual({ brand: '', tagline: '' });
    expect(selectNavigation(state)).toEqual([]);
    expect(selectHomeContent(state)).toEqual({
      hero: {
        videoUrl: '',
        headline: '',
        subheadline: '',
        ctaText: '',
        ctaTarget: '#',
      },
      highlights: [],
      testimonials: [],
    });
    expect(selectServicesContent(state)).toEqual({ intro: '', list: [] });
    expect(selectGalleryContent(state)).toEqual({ intro: '', items: [] });
    expect(selectContactContent(state)).toEqual({
      intro: '',
      details: { address: '', phone: '', email: '', hours: [] },
    });
  });
});
