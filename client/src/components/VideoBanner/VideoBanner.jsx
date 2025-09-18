import { Link } from 'react-router-dom';
import styles from './videoBanner.styles.scss?module';

const VideoBanner = ({ videoUrl, headline, subheadline, ctaText, ctaTarget }) => (
  <section className={styles.banner}>
    <video className={styles.video} autoPlay muted loop playsInline aria-hidden="true">
      <source src={videoUrl} type="video/mp4" />
    </video>
    <div className={styles.overlay}>
      <h1 className={styles.headline}>{headline}</h1>
      <p className={styles.subheadline}>{subheadline}</p>
      <Link to={ctaTarget} className={styles.cta}>
        {ctaText}
      </Link>
    </div>
  </section>
);

export default VideoBanner;
