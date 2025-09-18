import { useSelector } from '../../lib/reactRedux.js';
import { selectGalleryContent } from '../../store/slices/contentSlice.js';
import GalleryGrid from '../../components/GalleryGrid/GalleryGrid';
import GalleryModal from '../../components/GalleryModal/GalleryModal';
import styles from './gallery.styles.scss?module';

const Gallery = () => {
  const { intro, items } = useSelector(selectGalleryContent);

  return (
    <section className={styles.gallery}>
      <header className={styles.hero}>
        <h1>Gallery</h1>
        <p>{intro}</p>
      </header>
      <GalleryGrid items={items} />
      <GalleryModal />
    </section>
  );
};

export default Gallery;
