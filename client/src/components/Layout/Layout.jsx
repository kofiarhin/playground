import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import styles from './layout.styles.scss?module';

const Layout = ({ children }) => (
  <div className={styles.layout}>
    <Header />
    <main className={styles.main}>{children}</main>
    <Footer />
  </div>
);

export default Layout;
