import { useTranslation } from "react-i18next";
import DiscoverMoreTypewriter from "../../common/DiscoverMoreTypewriter";

interface WhoAmIProps {
  isLanguageChanged: boolean;
  singleSectionClassName: string;
  wasSectionViewed: boolean;
}

function WhoAmI({ isLanguageChanged, singleSectionClassName, wasSectionViewed }: WhoAmIProps) {
  const HOMEPAGE_WHOAMI_CLASSNAME = "homepage-whoami";
  
  const { t } = useTranslation("pages/Homepage");

  return (
    <div className={`${singleSectionClassName} ${HOMEPAGE_WHOAMI_CLASSNAME}`}>
      <h2>{t("WhoAmI.TITLE")}</h2>
      <p>{t("WhoAmI.SHORT_PRESENTATION")}</p>
      <p>{t("WhoAmI.CURRENT_SITUATION")}</p>
      <p>{t("WhoAmI.FUTURE_GOALS")}</p>
      { wasSectionViewed && 
        <DiscoverMoreTypewriter
          section="WhoAmI"
          isLanguageChanged={isLanguageChanged}
          onInitCompleted={(_discoverMoreTypewriter) => {
            _discoverMoreTypewriter.start();
          } }
          onAnimationFinished={() => {}}
        />
      }
    </div>
  );
}

export default WhoAmI;
