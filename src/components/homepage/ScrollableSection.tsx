import { ReactNode } from 'react';

interface ScrollableSectionProps {
  children: ReactNode;
}

function ScrollableSection({ children }: ScrollableSectionProps) {
  const HOMEPAGE_SCROLLABLE_SECTION_CLASSNAME = '_homepage-scrollable-section';
  return (
    <div className={HOMEPAGE_SCROLLABLE_SECTION_CLASSNAME}>
      {children}
    </div>
  );
}

export default ScrollableSection;