import { Link } from 'react-router-dom';
import { useRestaurants } from '../../api/hooks/useRestaurants';
import { useOrders } from '../../api/hooks/useOrders';
import content from '../../constants/content.json';

const OwnerDashboard = () => {
  const { restaurantsQuery } = useRestaurants();
  const { ordersQuery } = useOrders();

  return (
    <section>
      <h1>{content.dashboard.headline}</h1>
      <h2>Your restaurants</h2>
      <ul>
        {restaurantsQuery.data?.data?.map((restaurant) => (
          <li key={restaurant._id}>
            <Link to={`/dashboard/restaurants/${restaurant._id}/menu`}>{restaurant.name}</Link>
          </li>
        ))}
      </ul>
      <h2>Recent orders</h2>
      <ul>
        {ordersQuery.data?.data?.slice(0, 5).map((order) => (
          <li key={order._id}>
            <Link to={`/orders/${order._id}`}>Order {order._id.slice(-5)}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default OwnerDashboard;
