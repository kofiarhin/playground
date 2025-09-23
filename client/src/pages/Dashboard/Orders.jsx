import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useOrders } from '../../api/hooks/useOrders';
import OrderStatusBadge from '../../components/OrderStatusBadge';

const Orders = () => {
  const { ordersQuery, updateStatusMutation } = useOrders();
  const { user } = useSelector((state) => state.auth);
  const isOwner = user?.role === 'owner' || user?.role === 'admin';

  if (ordersQuery.isLoading) {
    return <p>Loading orders...</p>;
  }

  return (
    <section>
      <h1>Orders</h1>
      <ul>
        {ordersQuery.data?.data?.map((order) => (
          <li key={order._id}>
            <Link to={`/orders/${order._id}`}>Order {order._id.slice(-5)}</Link>
            <OrderStatusBadge status={order.status} />
            {isOwner ? (
              <button type="button" onClick={() => updateStatusMutation.mutate({ orderId: order._id, status: 'completed' })}>
                Mark completed
              </button>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Orders;
