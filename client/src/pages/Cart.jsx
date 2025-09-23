import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import content from '../constants/content.json';

const Cart = () => {
  const snapshot = useSelector((state) => state.cart);
  return (
    <section>
      <h1>{content.cart.headline}</h1>
      <p>Items: {snapshot.itemCount}</p>
      <p>Subtotal: ${snapshot.subtotal.toFixed(2)}</p>
      <p>Tax: ${snapshot.tax.toFixed(2)}</p>
      <p>Total: ${snapshot.total.toFixed(2)}</p>
      <Link to="/checkout">Proceed to checkout</Link>
    </section>
  );
};

export default Cart;
