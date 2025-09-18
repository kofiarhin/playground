import { createContext, createElement, useContext, useMemo, useSyncExternalStore } from 'react';

const StoreContext = createContext(null);

export const Provider = ({ store, children }) => {
  const value = useMemo(() => store, [store]);
  return createElement(StoreContext.Provider, { value }, children);
};

export const useDispatch = () => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error('useDispatch must be used within a Provider.');
  }
  return store.dispatch;
};

export const useSelector = (selector) => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error('useSelector must be used within a Provider.');
  }
  return useSyncExternalStore(store.subscribe, () => selector(store.getState()));
};
