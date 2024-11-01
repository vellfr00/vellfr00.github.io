import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';

import './styles/common/website.css';
import './styles/common/colors.css';
import './styles/common/scrollbar.css';
import './styles/common/font.css';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Contacts from './pages/Contacts';

function App() {
  const APP_UNSET_OVERFLOW_CLASSANAME = 'unset-overflow';

  const { i18n } = useTranslation();

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
    if(window.location.pathname !== '/') {
      document.body.classList.add(APP_UNSET_OVERFLOW_CLASSANAME);
      document.getElementById('root')?.classList.add(APP_UNSET_OVERFLOW_CLASSANAME);
    }
    else {
      document.body.classList.remove(APP_UNSET_OVERFLOW_CLASSANAME);
      document.getElementById('root')?.classList.remove(APP_UNSET_OVERFLOW_CLASSANAME);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/contacts" element={<Contacts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
