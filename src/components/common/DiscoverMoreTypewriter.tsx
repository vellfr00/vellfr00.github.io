import Typewriter, { TypewriterClass } from "typewriter-effect";
import { useTranslation } from "react-i18next";
import '../../styles/common/components/DiscoverMoreTypewriter.css';

interface DiscoverMoreTypewriterProps {
  section: string;
  isLanguageChanged: boolean;
  onInitCompleted: (discoverMoreTypewriter: TypewriterClass) => void;
  onAnimationFinished: () => void;
}

function DiscoverMoreTypewriter({
  section,
  isLanguageChanged,
  onInitCompleted,
  onAnimationFinished
}: DiscoverMoreTypewriterProps) {
  const DISCOVER_MORE_TYPEWRITER_SPAN_ID = `discover-more-typewriter__${section}`;

  const { t } = useTranslation("pages/Homepage");

  const setCursorDisplay = (display: string): void => {
    const cursor = document.querySelector<HTMLElement>(
      `#${DISCOVER_MORE_TYPEWRITER_SPAN_ID} .Typewriter__cursor`
    );
    if (cursor) cursor.style.display = display;
  };

  return (
    <span id={DISCOVER_MORE_TYPEWRITER_SPAN_ID}>
      {isLanguageChanged ? (t(`${section}.DISCOVER_MORE`)) : (
        <Typewriter
          options={{ delay: 25 }}
          onInit={(_discoverMoreTypewriter) => {
            setCursorDisplay("none");

            _discoverMoreTypewriter
              .callFunction(() => setCursorDisplay("inline"))
              .pauseFor(300)
              .typeString(t(`${section}.DISCOVER_MORE`))
              .callFunction(() => setCursorDisplay("none"))
              .stop()
              .callFunction(() => onAnimationFinished());

            onInitCompleted(_discoverMoreTypewriter);
          }}
        />
      )}
    </span>
  );
}

export default DiscoverMoreTypewriter;
