import styles from './OrderStatusBadge.styles.scss';

const OrderStatusBadge = ({ status }) => {
  return <span className={styles.badge}>{status}</span>;
};

export default OrderStatusBadge;
