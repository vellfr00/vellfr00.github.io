import Typewriter, { TypewriterClass } from "typewriter-effect";
import { useTranslation } from "react-i18next";
import '../../styles/common/components/DiscoverMoreTypewriter.css';

interface DiscoverMoreTypewriterProps {
  localePage: string;
  discoverMoreKey: string;
  isLanguageChanged: boolean;
  onInitCompleted: (discoverMoreTypewriter: TypewriterClass) => void;
  onAnimationFinished: () => void;
  icon?: JSX.Element;
  onClick?: () => void;
}

function DiscoverMoreTypewriter({
  localePage,
  discoverMoreKey,
  isLanguageChanged,
  onInitCompleted,
  onAnimationFinished,
  icon,
  onClick
}: DiscoverMoreTypewriterProps) {
  const DISCOVER_MORE_TYPEWRITER_SPAN_ID = `discover-more-typewriter__${discoverMoreKey}`;

  const { t } = useTranslation(localePage);

  const setCursorDisplay = (display: string): void => {
    const cursor = document.querySelector<HTMLElement>(
      `#${DISCOVER_MORE_TYPEWRITER_SPAN_ID} .Typewriter__cursor`
    );
    if (cursor) cursor.style.display = display;
  };

  return (
    <span id={DISCOVER_MORE_TYPEWRITER_SPAN_ID} onClick={onClick}>
      {icon}
      {isLanguageChanged ? (t(`${discoverMoreKey}.DISCOVER_MORE`)) : (
        <Typewriter
          options={{ delay: 25 }}
          onInit={(_discoverMoreTypewriter) => {
            setCursorDisplay("none");

            _discoverMoreTypewriter
              .callFunction(() => setCursorDisplay("inline"))
              .pauseFor(300)
              .typeString(t(`${discoverMoreKey}.DISCOVER_MORE`))
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
