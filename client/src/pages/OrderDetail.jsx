import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';
import OrderStatusBadge from '../components/OrderStatusBadge';
import DeliveryTracker from '../components/DeliveryTracker';
import content from '../constants/content.json';

const OrderDetail = () => {
  const { orderId } = useParams();
  const orderQuery = useQuery({
    queryKey: ['order', orderId],
    queryFn: async () => {
      const response = await api.get(`/orders/${orderId}`);
      return response.data;
    }
  });

  if (orderQuery.isLoading) {
    return <p>Loading order...</p>;
  }

  const order = orderQuery.data?.data;

  if (!order) {
    return <p>Order not found</p>;
  }

  return (
    <section>
      <h1>{content.orders.headline}</h1>
      <OrderStatusBadge status={order.status} />
      <ul>
        {order.items.map((item) => (
          <li key={item.menuItem}>
            {item.name} x {item.quantity}
          </li>
        ))}
      </ul>
      <p>Total: ${order.total.toFixed(2)}</p>
      <DeliveryTracker orderId={orderId} />
    </section>
  );
};

export default OrderDetail;
