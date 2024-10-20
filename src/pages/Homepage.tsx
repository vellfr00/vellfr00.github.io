import Header from '../components/homepage/sections/Header';
import MegaScroll from "react-mega-scroll";
import { useState } from 'react';
import ScrollableSection from '../components/homepage/ScrollableSection';
import FloatingLanguageSwitch from '../components/homepage/FloatingLanguageSwitch';
import WhoAmI from '../components/homepage/sections/WhoAmI';
import '../styles/pages/homepage/Homepage.css';

function Homepage() {
  const HOMEPAGE_SINGLE_SECTION_CLASSNAME = '_homepage-section';

  const [isHeaderAnimationFinished, setIsHeaderAnimationFinished] = useState(false);
  const [isLanguageChanged, setIsLanguageChanged] = useState(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  return (
    <>
      <MegaScroll onChange={ setCurrentSectionIndex }>
        <ScrollableSection>
          <Header 
            singleSectionClassName = { HOMEPAGE_SINGLE_SECTION_CLASSNAME }
            onAnimationFinished = { () => setIsHeaderAnimationFinished(true) }
            isLanguageChanged = { isLanguageChanged }
          />
        </ScrollableSection>
        { isHeaderAnimationFinished && 
          <>
            <ScrollableSection>
              <WhoAmI singleSectionClassName = { HOMEPAGE_SINGLE_SECTION_CLASSNAME } />
            </ScrollableSection>
          </>
        }
      </MegaScroll>
      { isHeaderAnimationFinished && <FloatingLanguageSwitch onLanguageChange={ () => setIsLanguageChanged(true) } /> }
    </>
  )
}


export default Homepage;