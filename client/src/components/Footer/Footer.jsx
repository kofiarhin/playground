import { useSelector } from '../../lib/reactRedux.js';
import { selectContactContent, selectMeta } from '../../store/slices/contentSlice.js';
import styles from './footer.styles.scss?module';

const Footer = () => {
  const meta = useSelector(selectMeta);
  const { details } = useSelector(selectContactContent);

  return (
    <footer className={styles.footer}>
      <div>
        <p className={styles.brand}>{meta.brand}</p>
        <p className={styles.tagline}>{meta.tagline}</p>
      </div>
      <div className={styles.details}>
        <span>{details.address}</span>
        <span>{details.phone}</span>
        <span>{details.email}</span>
      </div>
      <p className={styles.copy}>
        © {new Date().getFullYear()} {meta.brand}. Crafted for indulgent escapes.
      </p>
    </footer>
  );
};

export default Footer;
