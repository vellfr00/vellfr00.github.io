import Typewriter, { TypewriterClass } from 'typewriter-effect';
import { useTranslation } from 'react-i18next';
import DiscoverMoreTypewriter from '../DiscoverMoreTypewriter';

interface HeaderProps {
  singleSectionClassName: string;
  onAnimationFinished: () => void;
  isLanguageChanged: boolean;
}

function Header({ singleSectionClassName, onAnimationFinished, isLanguageChanged }: HeaderProps) {
  const HOMEPAGE_HEADER_CLASSNAME = 'homepage-header';
  const NAME_TYPEWRITER_H1_ID = 'name-typewriter';
  const PROFESSION_TYPEWRITER_H2_ID = 'profession-typewriter';
  const GREETINGS_TYPEWRITER_H3_ID = 'greetings-typewriter';

  let nameTypewriter: TypewriterClass | null = null;
  let professionTypewriter: TypewriterClass | null = null;
  let greetingsTypewriter: TypewriterClass | null = null;
  let discoverMoreTypewriter: TypewriterClass | null = null;

  const { t } = useTranslation('pages/Homepage');

  const setCursorDisplayByContainerId = (containerId: string, display: string): void => {
    const cursor = document.querySelector<HTMLElement>(`#${containerId} .Typewriter__cursor`);
    if (cursor)
      cursor.style.display = display;
  }

  /**
  * When language changes, animation will already be completed but strings are not replaced.
  * Detecting language change will substitute typewriters with simple text.
  * By doing this, the correct translation will be displayed.
  * */
  return (
    <div className={`${singleSectionClassName} ${HOMEPAGE_HEADER_CLASSNAME}`}>
      <h1 id={NAME_TYPEWRITER_H1_ID}>
        { isLanguageChanged ? t('Header.NAME') : 
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
        }
      </h1>
      <h2 id={PROFESSION_TYPEWRITER_H2_ID}>
        { isLanguageChanged ? t('Header.PROFESSION') : 
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
        }
      </h2>
      <h3 id={GREETINGS_TYPEWRITER_H3_ID}>
        { isLanguageChanged ? t('Header.GREETINGS') : 
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
        }
      </h3>
      <DiscoverMoreTypewriter
        section = 'Header'
        isLanguageChanged = { isLanguageChanged }
        onInitCompleted={ (_discoverMoreTypewriter) => {
          discoverMoreTypewriter = _discoverMoreTypewriter;
          nameTypewriter?.start();
        } }
        onAnimationFinished = { onAnimationFinished }
      />
    </div>
  )
}

export default Header;