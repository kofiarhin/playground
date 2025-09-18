import { useContent } from '../../context/ContentContext';
import ContactDetails from '../../components/ContactDetails/ContactDetails';
import ContactForm from '../../components/ContactForm/ContactForm';
import styles from './contact.styles.scss?module';

const Contact = () => {
  const {
    contact: { intro, details },
  } = useContent();

  return (
    <div className={styles.contact}>
      <ContactDetails details={details} intro={intro} />
      <ContactForm />
    </div>
  );
};

export default Contact;
