import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import { useEffect } from 'react';

function Layout() {
  const location = useLocation();
  const isGuide = location.pathname === '/guide';

  // 기존 common.js: syncHeight (--window-inner-height)
  useEffect(() => {
    const syncHeight = () => {
      document.documentElement.style.setProperty(
        '--window-inner-height',
        `${window.innerHeight}px`
      );
    };
    syncHeight();
    window.addEventListener('resize', syncHeight);
    return () => window.removeEventListener('resize', syncHeight);
  }, []);

  return (
    <div className={`wrap ${isGuide ? 'page-guide' : ''}`}>
      <div className="nav-wrap">
        <Header />
        <Nav />
      </div>
      <div className="container">
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
