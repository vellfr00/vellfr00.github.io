import '../styles/home.css';
import Header from '../components/homepage/sections/Header';
import MegaScroll from "react-mega-scroll";
import { useState } from 'react';
import ScrollableSection from '../components/homepage/ScrollableSection';
import FloatingLanguageSwitch from '../components/homepage/FloatingLanguageSwitch';

function Homepage() {
  const [isHeaderAnimationFinished, setIsHeaderAnimationFinished] = useState(false);
  const [isLanguageChanged, setIsLanguageChanged] = useState(false);

  return (
    <>
      <MegaScroll>
        <ScrollableSection>
          <Header 
            onAnimationFinished = { () => setIsHeaderAnimationFinished(true) }
            isLanguageChanged = { isLanguageChanged }
          />
        </ScrollableSection>
      </MegaScroll>
      { isHeaderAnimationFinished && <FloatingLanguageSwitch onLanguageChange={ () => setIsLanguageChanged(true) } /> }
    </>
  )
}


export default Homepage;