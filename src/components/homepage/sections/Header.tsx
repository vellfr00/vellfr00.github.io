import Typewriter, { TypewriterClass } from 'typewriter-effect';
import { useTranslation } from 'react-i18next';

interface HeaderProps {
  onAnimationFinished: () => void;
}

function Header({ onAnimationFinished }: HeaderProps) {
  const HOMEPAGE_HEADER_CLASSNAME = 'homepage-header';
  const NAME_TYPEWRITER_H1_ID = 'name-typewriter';
  const PROFESSION_TYPEWRITER_H2_ID = 'profession-typewriter';
  const GREETINGS_TYPEWRITER_H3_ID = 'greetings-typewriter';
  const DISCOVER_MORE_TYPEWRITER_SPAN_ID = 'discover-more-typewriter';

  let nameTypewriter: TypewriterClass | null = null;
  let professionTypewriter: TypewriterClass | null = null;
  let greetingsTypewriter: TypewriterClass | null = null;
  let discoverMoreTypewriter: TypewriterClass | null = null;

  const { t } = useTranslation('Homepage');

  const setCursorDisplayByContainerId = (containerId: string, display: string): void => {
    const cursor = document.querySelector<HTMLElement>(`#${containerId} .Typewriter__cursor`);
    if (cursor)
      cursor.style.display = display;
  }

  return (
    <div className={HOMEPAGE_HEADER_CLASSNAME}>
      <h1 id={NAME_TYPEWRITER_H1_ID}>
        <Typewriter
          onInit={(_nameTypewriter) => {
            _nameTypewriter
              .typeString(t('Header.NAME'))
              .callFunction(() => {
                professionTypewriter?.start();
                setCursorDisplayByContainerId(NAME_TYPEWRITER_H1_ID, 'none');
              })
              .stop();

            nameTypewriter = _nameTypewriter;
          }}
        />
      </h1>
      <h2 id={PROFESSION_TYPEWRITER_H2_ID}>
        <Typewriter
          onInit={(_professionTypewriter) => {
            setCursorDisplayByContainerId(PROFESSION_TYPEWRITER_H2_ID, 'none');

            _professionTypewriter
              .callFunction(() => {
                setCursorDisplayByContainerId(PROFESSION_TYPEWRITER_H2_ID, 'inline');
              })
              .changeDelay(50)
              .pauseFor(500)
              .typeString(t('Header.PROFESSION'))
              .callFunction(() => {
                greetingsTypewriter?.start();
                setCursorDisplayByContainerId(PROFESSION_TYPEWRITER_H2_ID, 'none');
              })
              .stop();

            professionTypewriter = _professionTypewriter;
          }}
        />
      </h2>
      <h3 id={GREETINGS_TYPEWRITER_H3_ID}>
        <Typewriter
          onInit={(_greetingsTypewriter) => {
            setCursorDisplayByContainerId(GREETINGS_TYPEWRITER_H3_ID, 'none');

            _greetingsTypewriter
              .callFunction(() => {
                setCursorDisplayByContainerId(GREETINGS_TYPEWRITER_H3_ID, 'inline');
              })
              .changeDelay(50)
              .pauseFor(300)
              .typeString(t('Header.GREETINGS'))
              .callFunction(() => {
                discoverMoreTypewriter?.start();
                setCursorDisplayByContainerId(GREETINGS_TYPEWRITER_H3_ID, 'none');
              })
              .stop();

            greetingsTypewriter = _greetingsTypewriter;
          }}
        />
      </h3>
      <span id={DISCOVER_MORE_TYPEWRITER_SPAN_ID}>
        <Typewriter
          onInit={(_discoverMoreTypewriter) => {
            setCursorDisplayByContainerId(DISCOVER_MORE_TYPEWRITER_SPAN_ID, 'none');

            _discoverMoreTypewriter
              .callFunction(() => {
                setCursorDisplayByContainerId(DISCOVER_MORE_TYPEWRITER_SPAN_ID, 'inline');
              })
              .changeDelay(50)
              .pauseFor(300)
              .typeString(t('Header.DISCOVER_MORE'))
              .callFunction(() => setCursorDisplayByContainerId(DISCOVER_MORE_TYPEWRITER_SPAN_ID, 'none'))
              .stop()
              .callFunction(() => onAnimationFinished());

            discoverMoreTypewriter = _discoverMoreTypewriter;

            nameTypewriter?.start();
          }}
        />
      </span>
    </div>
  )
}

export default Header;