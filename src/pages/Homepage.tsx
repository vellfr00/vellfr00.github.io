import '../styles/home.css';
import Header from '../components/homepage/sections/Header';
import MegaScroll from "react-mega-scroll";
import { useState } from 'react';
import ScrollableSection from '../components/homepage/ScrollableSection';

function Homepage() {
  const [isHeaderAnimationFinished, setIsHeaderAnimationFinished] = useState(false);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);

  return (
    <MegaScroll onChange={ setActiveSectionIndex }>
      <ScrollableSection>
        <Header 
          onAnimationFinished = { () => setIsHeaderAnimationFinished(true) }
        />
      </ScrollableSection>
    </MegaScroll>
  )
}


export default Homepage;