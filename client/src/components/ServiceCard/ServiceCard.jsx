import styles from './serviceCard.styles.scss?module';

const ServiceCard = ({ service }) => (
  <article className={styles.card}>
    <header className={styles.header}>
      <h3 className={styles.name}>{service.name}</h3>
      <span className={styles.price}>{service.price}</span>
    </header>
    <p className={styles.description}>{service.description}</p>
    <span className={styles.duration}>{service.duration}</span>
  </article>
);

export default ServiceCard;
