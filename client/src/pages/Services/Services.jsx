import { useSelector } from '../../lib/reactRedux.js';
import { selectServicesContent } from '../../store/slices/contentSlice.js';
import ServiceCard from '../../components/ServiceCard/ServiceCard';
import styles from './services.styles.scss?module';

const Services = () => {
  const { intro, list } = useSelector(selectServicesContent);

  return (
    <section className={styles.services}>
      <header className={styles.hero}>
        <h1>LuxeAura Signatures</h1>
        <p>{intro}</p>
      </header>
      <div className={styles.grid}>
        {list.map((service) => (
          <ServiceCard key={service.name} service={service} />
        ))}
      </div>
    </section>
  );
};

export default Services;
