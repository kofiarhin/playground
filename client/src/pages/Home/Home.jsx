import { useSelector } from '../../lib/reactRedux.js';
import { selectHomeContent } from '../../store/slices/contentSlice.js';
import VideoBanner from '../../components/VideoBanner/VideoBanner';
import Highlights from '../../components/Highlights/Highlights';
import styles from './home.styles.scss?module';

const Home = () => {
  const { hero, highlights, testimonials } = useSelector(selectHomeContent);

  return (
    <div className={styles.home}>
      <VideoBanner
        videoUrl={hero.videoUrl}
        headline={hero.headline}
        subheadline={hero.subheadline}
        ctaText={hero.ctaText}
        ctaTarget={hero.ctaTarget}
      />
      <Highlights items={highlights} />
      <section className={styles.testimonials}>
        {testimonials.map((entry) => (
          <figure key={entry.guest} className={styles.testimonial}>
            <blockquote>“{entry.quote}”</blockquote>
            <figcaption>— {entry.guest}</figcaption>
          </figure>
        ))}
      </section>
    </div>
  );
};

export default Home;
