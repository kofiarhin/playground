import styles from './statusScreen.styles.scss?module';

const StatusScreen = ({ message, variant = 'info' }) => (
  <div className={styles.wrapper} role="status">
    <div className={styles[variant]}>{message}</div>
  </div>
);

export default StatusScreen;
