import React from 'react';
import { renderToString } from 'react-dom/server';
import { ContentProvider, useContent } from '../context/ContentContext.js';

const Sample = () => {
  const data = useContent();
  return React.createElement('span', null, data.meta.brand);
};

describe('ContentProvider', () => {
  it('exposes content values to children', () => {
    const markup = renderToString(
      React.createElement(
        ContentProvider,
        { content: { meta: { brand: 'LuxeAura Salon' } } },
        React.createElement(Sample, null)
      )
    );

    expect(markup).toContain('LuxeAura Salon');
  });
});
