import { describe, it, expect } from 'vitest';
import store from '../store/store';
import { loginSuccess, logout } from '../store/slices/authSlice';
import { updateSnapshot } from '../store/slices/cartSlice';

describe('store reducers', () => {
  it('handles auth login and logout', () => {
    store.dispatch(loginSuccess({ token: 'abc', user: { id: '1' } }));
    expect(store.getState().auth.token).toBe('abc');
    store.dispatch(logout());
    expect(store.getState().auth.token).toBeNull();
  });

  it('updates cart snapshot', () => {
    store.dispatch(updateSnapshot({ subtotal: 10, tax: 1, total: 11, itemCount: 2 }));
    expect(store.getState().cart.total).toBe(11);
  });
});
