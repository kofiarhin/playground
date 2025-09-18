import { useState } from 'react';
import useCreateInquiry from '../../hooks/useCreateInquiry';
import styles from './contactForm.styles.scss?module';

const defaultState = {
  name: '',
  email: '',
  phone: '',
  message: '',
  marketingOptIn: false,
};

const ContactForm = () => {
  const [formState, setFormState] = useState(defaultState);
  const [feedback, setFeedback] = useState(null);
  const mutation = useCreateInquiry();

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormState((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFeedback(null);
    try {
      await mutation.mutateAsync(formState);
      setFeedback({ type: 'success', message: 'Our concierge team will reach out shortly.' });
      setFormState(defaultState);
    } catch (error) {
      setFeedback({ type: 'error', message: error.message });
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <h2 className={styles.heading}>Request a reservation</h2>
      <div className={styles.grid}>
        <label className={styles.field}>
          <span>Name</span>
          <input name="name" value={formState.name} onChange={handleChange} required />
        </label>
        <label className={styles.field}>
          <span>Email</span>
          <input
            name="email"
            type="email"
            value={formState.email}
            onChange={handleChange}
            required
          />
        </label>
        <label className={styles.field}>
          <span>Phone</span>
          <input name="phone" value={formState.phone} onChange={handleChange} />
        </label>
        <label className={styles.field}>
          <span>Message</span>
          <textarea
            name="message"
            rows="4"
            value={formState.message}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <label className={styles.checkbox}>
        <input
          type="checkbox"
          name="marketingOptIn"
          checked={formState.marketingOptIn}
          onChange={handleChange}
        />
        <span>Keep me informed about new rituals and private events.</span>
      </label>
      <button className={styles.submit} type="submit" disabled={mutation.isLoading}>
        {mutation.isLoading ? 'Scheduling…' : 'Submit Request'}
      </button>
      {feedback && (
        <p className={styles[feedback.type]} role="alert">
          {feedback.message}
        </p>
      )}
    </form>
  );
};

export default ContactForm;
