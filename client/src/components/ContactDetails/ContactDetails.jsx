import styles from './contactDetails.styles.scss?module';

const ContactDetails = ({ details, intro }) => (
  <section className={styles.details}>
    <header>
      <h2 className={styles.heading}>Connect with our concierge</h2>
      <p className={styles.intro}>{intro}</p>
    </header>
    <div className={styles.grid}>
      <div>
        <h3 className={styles.title}>Visit</h3>
        <p className={styles.value}>{details.address}</p>
      </div>
      <div>
        <h3 className={styles.title}>Call</h3>
        <p className={styles.value}>{details.phone}</p>
      </div>
      <div>
        <h3 className={styles.title}>Write</h3>
        <p className={styles.value}>{details.email}</p>
      </div>
      <div>
        <h3 className={styles.title}>Hours</h3>
        <ul className={styles.hours}>
          {details.hours.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

export default ContactDetails;
