import Header from '../components/homepage/sections/Header';
import MegaScroll from "react-mega-scroll";
import { useEffect, useState } from 'react';
import ScrollableSection from '../components/homepage/ScrollableSection';
import FloatingLanguageSwitch from '../components/homepage/FloatingLanguageSwitch';
import WhoAmI from '../components/homepage/sections/WhoAmI';
import '../styles/pages/homepage/Homepage.css';

function Homepage() {
  const HOMEPAGE_SINGLE_SECTION_CLASSNAME = '_homepage-section';

  const [isHeaderAnimationFinished, setIsHeaderAnimationFinished] = useState(false);
  const [isLanguageChanged, setIsLanguageChanged] = useState(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [viewedSections, setViewedSections] = useState<number[]>([0]);
  /**
   * When the current section index changes, the viewed sections are updated.
   * If the current section index is not in the viewed sections, it is added.
   * */
  useEffect(() => {
    if (!viewedSections.includes(currentSectionIndex))
      setViewedSections([...viewedSections, currentSectionIndex]);
  }, [currentSectionIndex]);

  const wasSectionViewed = (sectionIndex: number): boolean => viewedSections.includes(sectionIndex);

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
              <WhoAmI 
                singleSectionClassName = { HOMEPAGE_SINGLE_SECTION_CLASSNAME }
                isLanguageChanged = { isLanguageChanged }
                wasSectionViewed = { wasSectionViewed(1) }
              />
            </ScrollableSection>
          </>
        }
      </MegaScroll>
      { isHeaderAnimationFinished && <FloatingLanguageSwitch onLanguageChange={ () => setIsLanguageChanged(true) } /> }
    </>
  )
}


export default Homepage;