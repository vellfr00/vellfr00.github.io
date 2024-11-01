import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Fab, Action } from "react-tiny-fab";
import Flag from 'react-world-flags'
import { FloatingElement } from "./FloatingElements";

interface FloatingLanguageSwitchProps {
  onLanguageChange: () => void;
  closeAllOtherFloatingMenus: (keepOpen: FloatingElement) => void;
  triggerClose: boolean;
}

function FloatingLanguageSwitch({ onLanguageChange, closeAllOtherFloatingMenus, triggerClose }: FloatingLanguageSwitchProps) {
  const FLOATING_LANGUAGE_SWITCH_ID = "__floating__language-switch";

  const { t, i18n } = useTranslation('LanguageSwitch');
  const [otherAvailableLanguages, setOtherAvailableLanguages] = useState<string[]>([]);

  useEffect(() => {
    const supportedLanguages: string[] = i18n.options.supportedLngs ? i18n.options.supportedLngs.slice() : [];
    const _otherAvailableLanguages = supportedLanguages.filter((language) => language !== 'cimode');
    setOtherAvailableLanguages(_otherAvailableLanguages);
  }, [i18n.language, i18n.options.supportedLngs]);

  const isOpen = () => {
    const floatingLanguageSwitch = document.getElementById(FLOATING_LANGUAGE_SWITCH_ID);
    return floatingLanguageSwitch?.classList.contains('open') || false;
  }

  const open = () => {
    closeAllOtherFloatingMenus("language-switch");

    const floatingLanguageSwitch = document.getElementById(FLOATING_LANGUAGE_SWITCH_ID);
    floatingLanguageSwitch?.classList.add('open');
  }

  const close = () => {
    const floatingLanguageSwitch = document.getElementById(FLOATING_LANGUAGE_SWITCH_ID);
    floatingLanguageSwitch?.classList.remove('open');
  }

  /**
   * Close the floating language switch when the trigger changes
   * */
  useEffect(() => close(), [triggerClose]);

  return (
    <Fab
      event="click"
      icon={
        <Flag 
          code={t(`languages.${i18n.language}._react_world_flags_code`)}
          height={15}
        />
      }
      style={{ top: 10, right: 70 }}
      alwaysShowTitle={true}
      onClick={() => {
        if(isOpen()) {
          close();
        } else {
          open();
        }
      }}
      { ...{ id: FLOATING_LANGUAGE_SWITCH_ID } }
    >
      {
        otherAvailableLanguages.map((language) => (
          <Action
            id={language === i18n.language ? `__selected_floating__language-switch-option-${language}` : undefined}
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
          />
        ))
      }
    </Fab>
  );
}

export default FloatingLanguageSwitch;