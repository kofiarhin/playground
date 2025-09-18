import { useDispatch } from '../../lib/reactRedux.js';
import { openGalleryModal } from '../../store/slices/uiSlice';
import styles from './galleryGrid.styles.scss?module';

const GalleryGrid = ({ items }) => {
  const dispatch = useDispatch();

  const handleOpen = (item) => {
    dispatch(openGalleryModal(item));
  };

  return (
    <section className={styles.grid}>
      {items.map((item) => (
        <button
          type="button"
          key={item.id}
          className={styles.cell}
          onClick={() => handleOpen(item)}
        >
          <img src={item.imageUrl} alt={item.alt} className={styles.image} />
          <span className={styles.caption}>{item.caption}</span>
        </button>
      ))}
    </section>
  );
};

export default GalleryGrid;
