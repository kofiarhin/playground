import { useDelivery } from '../api/hooks/useDelivery';
import styles from './DeliveryTracker.styles.scss';

const DeliveryTracker = ({ orderId }) => {
  const { data, isLoading } = useDelivery(orderId);
  const delivery = data?.data;
  if (isLoading) {
    return <p>Loading delivery...</p>;
  }
  if (!delivery) {
    return null;
  }
  return (
    <div className={styles.tracker}>
      <p className={styles.status}>Status: {delivery.status}</p>
      {delivery.eta ? <p className={styles.eta}>ETA: {new Date(delivery.eta).toLocaleString()}</p> : null}
    </div>
  );
};

export default DeliveryTracker;
