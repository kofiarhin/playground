import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCartDrawer } from '../store/slices/uiSlice';
import { useCart } from '../api/hooks/useCart';
import styles from './CartDrawer.styles.scss';
import { updateSnapshot } from '../store/slices/cartSlice';

const CartDrawer = () => {
  const dispatch = useDispatch();
  const { cartDrawerOpen } = useSelector((state) => state.ui);
  const { data, isLoading, checkoutMutation } = useCart();

  const cart = data?.data || { items: [] };
  const items = cart.items || [];
  const subtotal = cart.subtotal || 0;
  const tax = cart.tax || 0;
  const total = cart.total || 0;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    dispatch(updateSnapshot({ subtotal, tax, total, itemCount }));
  }, [dispatch, subtotal, tax, total, itemCount]);

  const handleClose = () => {
    dispatch(toggleCartDrawer());
  };

  const handleCheckout = () => {
    checkoutMutation.mutate(undefined, {
      onSuccess: () => {
        dispatch(toggleCartDrawer());
      }
    });
  };

  if (!cartDrawerOpen) {
    return null;
  }

  return (
    <aside className={styles.drawer}>
      <div className={styles.header}>
        <h2>Cart</h2>
        <button type="button" onClick={handleClose}>
          Close
        </button>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className={styles.list}>
          {items.length ? (
            items.map((item) => (
              <div key={item.menuItem} className={styles.item}>
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))
          ) : (
            <p>Your cart is empty</p>
          )}
        </div>
      )}
      <div>
        <p>Subtotal: ${subtotal.toFixed(2)}</p>
        <p>Tax: ${tax.toFixed(2)}</p>
        <p>Total: ${total.toFixed(2)}</p>
        <button type="button" className={styles.checkoutButton} onClick={handleCheckout} disabled={!items.length}>
          Checkout
        </button>
      </div>
    </aside>
  );
};

export default CartDrawer;
