import styles from './MenuCard.styles.scss';

const MenuCard = ({ item, onAdd }) => {
  return (
    <div className={styles.card}>
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <div className={styles.actions}>
        <span>${item.price.toFixed(2)}</span>
        <button type="button" className={styles.button} onClick={() => onAdd(item)}>
          Add
        </button>
      </div>
    </div>
  );
};

export default MenuCard;
