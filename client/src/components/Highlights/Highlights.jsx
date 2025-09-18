import styles from './highlights.styles.scss?module';

const Highlights = ({ items }) => (
  <section className={styles.highlights}>
    {items.map((item) => (
      <article key={item.title} className={styles.highlight}>
        <h3 className={styles.title}>{item.title}</h3>
        <p className={styles.description}>{item.description}</p>
      </article>
    ))}
  </section>
);

export default Highlights;
