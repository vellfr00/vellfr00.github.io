import Header from '../components/homepage/sections/Header';
import MegaScroll from "react-mega-scroll";
import { useEffect, useState } from 'react';
import ScrollableSection from '../components/homepage/ScrollableSection';
import WhoAmI from '../components/homepage/sections/WhoAmI';
import '../styles/pages/homepage/Homepage.css';
import Projects from '../components/homepage/sections/Projects';
import FloatingElements from '../components/common/FloatingElements';
import { analytics__trackPageView } from '../integration/googleanalytics.integration';

function Homepage() {
  const HOMEPAGE_SCROLL_CONTAINER_CLASSNAME = 'ms-container';
  const HOMEPAGE_SCROLL_SECTION_BACKGROUND_SHOW_CLASSNAME = 'show-background';
  const HOMEPAGE_SINGLE_SECTION_CLASSNAME = '_homepage-section';

  const SESSION_HOMEPAGE_HEADER_ANIMATION_VIEWED_KEY = '__session_homepage_header_animation_viewed';

  const [isHeaderAnimationFinished, setIsHeaderAnimationFinished] = useState(false);
  const [isLanguageChanged, setIsLanguageChanged] = useState(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [viewedSections, setViewedSections] = useState<number[]>([0]);
  const [skipHeaderAnimation, setSkipHeaderAnimation] = useState(false);

  /**
   * On load of the homepage, check if the header animation has been viewed in this session.
   * If it has, skip the animation - else set the session storage item to false.
   * Additionally, track the view of the homepage in Google Analytics.
   * */
  useEffect(() => {
    if (sessionStorage.getItem(SESSION_HOMEPAGE_HEADER_ANIMATION_VIEWED_KEY) === 'true') {
      setSkipHeaderAnimation(true);
    } else {
      sessionStorage.setItem(SESSION_HOMEPAGE_HEADER_ANIMATION_VIEWED_KEY, 'false');
    }

    analytics__trackPageView("/", "Homepage");
  }, []);

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

  /**
   * When the header animation finishes, show other sections and floating buttons.
   * Additionally, add a class to the scroll container to show the background.
   * Finally, set a session storage item to indicate that the homepage has been viewed to skip the animation next time.
   * */
  const onHeaderAnimationFinished = () => {
    setIsHeaderAnimationFinished(true);
    document
      .querySelector(`.${HOMEPAGE_SCROLL_CONTAINER_CLASSNAME}`)
      ?.classList.add(HOMEPAGE_SCROLL_SECTION_BACKGROUND_SHOW_CLASSNAME);

    if(sessionStorage.getItem(SESSION_HOMEPAGE_HEADER_ANIMATION_VIEWED_KEY) === 'false')
      sessionStorage.setItem(SESSION_HOMEPAGE_HEADER_ANIMATION_VIEWED_KEY, 'true');
  };

  return (
    <>
      <MegaScroll onChange={ setCurrentSectionIndex }>
        <ScrollableSection>
          <Header 
            singleSectionClassName = { HOMEPAGE_SINGLE_SECTION_CLASSNAME }
            onAnimationFinished = { onHeaderAnimationFinished }
            skipHeaderAnimation = { skipHeaderAnimation }
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