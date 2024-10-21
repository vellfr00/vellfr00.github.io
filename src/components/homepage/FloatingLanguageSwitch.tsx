import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Fab, Action } from "react-tiny-fab";
import Flag from 'react-world-flags'

interface FloatingLanguageSwitchProps {
  onLanguageChange: () => void;
}

function FloatingLanguageSwitch({ onLanguageChange }: FloatingLanguageSwitchProps) {
  const { t, i18n } = useTranslation('LanguageSwitch');
  const [otherAvailableLanguages, setOtherAvailableLanguages] = useState<string[]>([]);

  useEffect(() => {
    const supportedLanguages: string[] = i18n.options.supportedLngs ? i18n.options.supportedLngs.slice() : [];
    const _otherAvailableLanguages = supportedLanguages.filter((language) => language !== 'cimode');
    setOtherAvailableLanguages(_otherAvailableLanguages);
  }, [i18n.language, i18n.options.supportedLngs]);

  return (
    <Fab
      event="hover"
      icon={
        <Flag 
          code={t(`languages.${i18n.language}._react_world_flags_code`)}
          height={20}
          style={{ transform: 'none'}}
        />
      }
      mainButtonStyles={{ 
        backgroundColor: 'var(--language-switch-color)',
      }}
      style={{ top: 10, right: 10 }}
      alwaysShowTitle={true}
    >
      {
        otherAvailableLanguages.map((language) => (
          <Action
            key={language}
            text={t(`languages.${language}.name`)}
            children={
              <Flag 
                code={t(`languages.${language}._react_world_flags_code`)}
                height={16}
              />
            }
            onClick={() => {
                if(language !== i18n.language) {
                  i18n.changeLanguage(language);
                  onLanguageChange();
                }
              }
            }
            style={{ 
              backgroundColor: language !== i18n.language ? 'var(--language-switch-color-unselected)' : 'var(--language-switch-color-selected)'
            }}
          />
        ))
      }
    </Fab>
  );
}

export default FloatingLanguageSwitch;