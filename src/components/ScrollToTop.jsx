import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollToTop() {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    // If not a hash anchor, scroll to top
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, search, hash]);

  return null;
}
