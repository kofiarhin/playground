import { useNavigate } from 'react-router-dom';
import { useCart } from '../api/hooks/useCart';
import content from '../constants/content.json';

const Checkout = () => {
  const navigate = useNavigate();
  const { data, checkoutMutation } = useCart();
  const cart = data?.data;

  const handleCheckout = () => {
    checkoutMutation.mutate(undefined, {
      onSuccess: (response) => {
        navigate(`/orders/${response.data.order._id}`);
      }
    });
  };

  return (
    <section>
      <h1>{content.checkout.headline}</h1>
      <p>Total due: ${cart?.total?.toFixed(2) || '0.00'}</p>
      <button type="button" onClick={handleCheckout} disabled={!cart?.items?.length}>
        Place order
      </button>
    </section>
  );
};

export default Checkout;
