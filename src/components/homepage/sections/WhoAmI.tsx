import { useTranslation } from "react-i18next";

interface WhoAmIProps {
  singleSectionClassName: string;
}

function WhoAmI({ singleSectionClassName }: WhoAmIProps) {
  const HOMEPAGE_WHOAMI_CLASSNAME = 'homepage-whoami';

  const { t } = useTranslation("pages/Homepage");
  
  return (
    <div className={`${singleSectionClassName} ${HOMEPAGE_WHOAMI_CLASSNAME}`}>
      <h2>{t("WhoAmI.TITLE")}</h2>
      <p>{t("WhoAmI.SHORT_PRESENTATION")}</p>
      <p>{t("WhoAmI.CURRENT_SITUATION")}</p>
      <p>{t("WhoAmI.FUTURE_GOALS")}</p>
    </div>
  );
}

export default WhoAmI;