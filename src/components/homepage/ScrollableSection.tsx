import { ReactNode } from 'react';

interface ScrollableSectionProps {
  children: ReactNode;
}

function ScrollableSection({ children }: ScrollableSectionProps) {
  return (
    <div className="_homepage-scrollable-section">
      {children}
    </div>
  );
}

export default ScrollableSection;