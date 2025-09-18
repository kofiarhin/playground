import { createContext, useContext, useMemo } from 'react';
import { useSyncExternalStore } from 'react';

const StoreContext = createContext(null);

export const Provider = ({ store, children }) => {
  const value = useMemo(() => store, [store]);
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
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
