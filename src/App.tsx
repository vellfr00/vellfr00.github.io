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
  const { i18n } = useTranslation();

  /**
   * Update the HTML lang attribute to the current language dynamically.
   */
  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

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
