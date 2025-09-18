import { NavLink } from 'react-router-dom';
import { useContent } from '../../context/ContentContext';
import styles from './header.styles.scss?module';

const Header = () => {
  const content = useContent();
  const { navigation, meta } = content;

  return (
    <header className={styles.header}>
      <div className={styles.branding}>
        <span className={styles.logo}>LuxeAura</span>
        <span className={styles.tagline}>{meta.tagline}</span>
      </div>
      <nav className={styles.navigation} aria-label="Primary navigation">
        {navigation.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              [styles.link, isActive ? styles.active : ''].filter(Boolean).join(' ')
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
};

export default Header;
