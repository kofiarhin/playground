import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { toggleCartDrawer, setTheme } from '../store/slices/uiSlice';
import styles from './Header.styles.scss';
import content from '../constants/content.json';

const Header = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { theme } = useSelector((state) => state.ui);
  const handleLogout = () => {
    dispatch(logout());
  };
  const handleThemeToggle = () => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
  };
  const handleCartClick = () => {
    dispatch(toggleCartDrawer());
  };
  return (
    <header className={styles.header} data-theme={theme}>
      <Link to="/">{content.home.headline}</Link>
      <nav className={styles.navLinks}>
        <Link to="/restaurants">Restaurants</Link>
        <Link to="/orders">Orders</Link>
        <button type="button" className={styles.themeToggle} onClick={handleThemeToggle}>
          {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
        <button type="button" className={styles.themeToggle} onClick={handleCartClick}>
          Cart
        </button>
        {token ? (
          <button type="button" className={styles.themeToggle} onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
