import React, { createContext, useContext } from 'react';

const ContentContext = createContext(null);

export const ContentProvider = ({ children, content }) =>
  React.createElement(ContentContext.Provider, { value: content }, children);

export const useContent = () => {
  const value = useContext(ContentContext);
  if (!value) {
    throw new Error('ContentContext is not available. Wrap components with ContentProvider.');
  }
  return value;
};

export default ContentContext;
