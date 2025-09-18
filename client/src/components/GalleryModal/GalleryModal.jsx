import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from '../../lib/reactRedux.js';
import { closeGalleryModal } from '../../store/slices/uiSlice';
import styles from './galleryModal.styles.scss?module';

const GalleryModal = () => {
  const dispatch = useDispatch();
  const { galleryModalOpen, selectedMedia } = useSelector((state) => state.ui);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (galleryModalOpen) {
      closeButtonRef.current?.focus();
    }
  }, [galleryModalOpen]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        dispatch(closeGalleryModal());
      }
    };

    if (galleryModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [dispatch, galleryModalOpen]);

  if (!galleryModalOpen || !selectedMedia) {
    return null;
  }

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      dispatch(closeGalleryModal());
    }
  };

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <button
          type="button"
          className={styles.close}
          onClick={() => dispatch(closeGalleryModal())}
          aria-label="Close gallery preview"
          ref={closeButtonRef}
        >
          ×
        </button>
        <img src={selectedMedia.imageUrl} alt={selectedMedia.alt} className={styles.image} />
        <p className={styles.caption}>{selectedMedia.caption}</p>
      </div>
    </div>
  );
};

export default GalleryModal;
