import { Link } from 'react-router-dom';
import styles from './Layout.module.css';

function Layout({ children }) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.logo}>📝 Note App</h1>
        <nav className={styles.nav}>
          <Link to="/" className={styles.navLink}>Home</Link>
          <Link to="/about" className={styles.navLink}>Chi Sono</Link>
        </nav>
      </header>
      <main className={styles.main}>
        {children}
      </main>
      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} - Note App - React Intermediate Challenge</p>
      </footer>
    </div>
  );
}

export default Layout;