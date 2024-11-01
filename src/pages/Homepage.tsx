import Header from '../components/homepage/sections/Header';
import MegaScroll from "react-mega-scroll";
import { useEffect, useState } from 'react';
import ScrollableSection from '../components/homepage/ScrollableSection';
import FloatingLanguageSwitch from '../components/common/FloatingLanguageSwitch';
import WhoAmI from '../components/homepage/sections/WhoAmI';
import '../styles/pages/homepage/Homepage.css';
import Projects from '../components/homepage/sections/Projects';
import FloatingMenu from '../components/common/FloatingMenu';
import FloatingElements from '../components/common/FloatingElements';

function Homepage() {
  const HOMEPAGE_SCROLL_CONTAINER_CLASSNAME = 'ms-container';
  const HOMEPAGE_SCROLL_SECTION_BACKGROUND_SHOW_CLASSNAME = 'show-background';
  const HOMEPAGE_SINGLE_SECTION_CLASSNAME = '_homepage-section';

  const [isHeaderAnimationFinished, setIsHeaderAnimationFinished] = useState(false);
  const [isLanguageChanged, setIsLanguageChanged] = useState(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [viewedSections, setViewedSections] = useState<number[]>([0]);
  /**
   * Preload the images and fonts used in the homepage when the component first mounts.
   */
  useEffect(() => {
    const toPreload: { url: string; as: string }[] = [
      { url: "https://fonts.googleapis.com/css2?family=Fira+Code:wght@300..700&display=swap", as: "font" },
      { url: "/public/images/Header-background.webp", as: "image" },
    ];

    toPreload.forEach(({ url, as }) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = as;
      link.href = url;
      document.head.appendChild(link);
    });
  }, []);

  /**
   * When the current section index changes, the viewed sections are updated.
   * If the current section index is not in the viewed sections, it is added.
   * */
  useEffect(() => {
    if (!viewedSections.includes(currentSectionIndex))
      setViewedSections([...viewedSections, currentSectionIndex]);
  }, [currentSectionIndex, viewedSections]);

  const wasSectionViewed = (sectionIndex: number): boolean => viewedSections.includes(sectionIndex);

  return (
    <>
      <MegaScroll onChange={ setCurrentSectionIndex }>
        <ScrollableSection>
          <Header 
            singleSectionClassName = { HOMEPAGE_SINGLE_SECTION_CLASSNAME }
            onAnimationFinished = { () => { 
              setIsHeaderAnimationFinished(true);
              document.querySelector(`.${HOMEPAGE_SCROLL_CONTAINER_CLASSNAME}`)?.classList.add(HOMEPAGE_SCROLL_SECTION_BACKGROUND_SHOW_CLASSNAME);
            } }
            isLanguageChanged = { isLanguageChanged }
          />
        </ScrollableSection>
        { isHeaderAnimationFinished && 
          <ScrollableSection>
            <WhoAmI 
              singleSectionClassName = { HOMEPAGE_SINGLE_SECTION_CLASSNAME }
              isLanguageChanged = { isLanguageChanged }
              wasSectionViewed = { wasSectionViewed(1) }
            />
          </ScrollableSection>
        }
        { isHeaderAnimationFinished && 
          <ScrollableSection>
            <Projects 
              singleSectionClassName = { HOMEPAGE_SINGLE_SECTION_CLASSNAME }
              isLanguageChanged = { isLanguageChanged }
              wasSectionViewed = { wasSectionViewed(2) }
            />
          </ScrollableSection>
        }
      </MegaScroll>
      { isHeaderAnimationFinished && 
        <>
          <FloatingElements
            currentPage='homepage'
            onLanguageChange={ () => setIsLanguageChanged(true) }
          />
        </>
      }
    </>
  )
}


export default Homepage;