import { Route, Routes, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Homepage from './pages/Homepage';

import './styles/common/website.css';
import './styles/common/colors.css';
import './styles/common/scrollbar.css';
import './styles/common/font.css';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Contacts from './pages/Contacts';
import { analytics__initGoogleAnalytics } from './integration/googleanalytics.integration';

function App() {
  const APP_SCROLL_OVERFLOW_CLASSNAME = 'scroll-overflow';

  const { i18n } = useTranslation();
  const location = useLocation();

  /**
   * On application load, initialize Google Analytics.
   */
  useEffect(() => {
    analytics__initGoogleAnalytics();
  }, []);

  /**
   * Update the HTML lang attribute to the current language dynamically.
   */
  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  /**
   * When we are not in the homepage, enable scroll which is disabled in the homepage
   * from the react-mega-scroll library with overflow hidden CSS property.
   * */
  useEffect(() => {
    if(location.pathname !== '/') {
      document.getElementById('root')?.classList.add(APP_SCROLL_OVERFLOW_CLASSNAME);
    }
    else {
      document.getElementById('root')?.classList.remove(APP_SCROLL_OVERFLOW_CLASSNAME);
    }
  }, [location]);

  return (
    <TransitionGroup component={null}>
      <CSSTransition
        key={location.key}
        classNames="fade"
        timeout={300}
      >
        <Routes location={location}>
          <Route path="/" element={<Homepage />} />
          <Route path="/contacts" element={<Contacts />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default App;
