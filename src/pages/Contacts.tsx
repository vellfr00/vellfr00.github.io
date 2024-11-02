import { useTranslation } from "react-i18next";
import ContactMeForm from "../components/contacts/ContactMeForm";
import "../styles/pages/contacts/Contacts.css";
import { useState } from "react";
import DiscoverMoreTypewriter from "../components/common/DiscoverMoreTypewriter";
import { LinkedIn } from "@mui/icons-material";
import FloatingElements from "../components/common/FloatingElements";

function Contacts() {
  const CONTACTS_PAGE_ID = "contacts-page";

  const [languageChangedFormTrigger, setLanguageChangedFormTrigger] =
    useState<boolean>(false);
  const [isLanguageChanged, setIsLanguageChanged] = useState<boolean>(false);

  const { t } = useTranslation("pages/Contacts");

  return (
    <>
      <div id={CONTACTS_PAGE_ID}>
        <h1>{t("TITLE")}</h1>
        <p>{t("CONTACT_ME_DISCLAIMER")}</p>
        <ContactMeForm
          triggerErrorMessagesLanguageUpdate={languageChangedFormTrigger}
        />

        <DiscoverMoreTypewriter
          localePage="pages/Contacts"
          discoverMoreKey="LinkedIn"
          isLanguageChanged={isLanguageChanged}
          onInitCompleted={(discoverMoreTypewriter) =>
            discoverMoreTypewriter.start()
          }
          skipAnimation={false}
          onAnimationFinished={() => {}}
          icon={<LinkedIn />}
          onClick={ () => window.open("https://www.linkedin.com/in/francesco-velluto-1629961b0/", "_blank") }
        />
      </div>
      <FloatingElements 
        currentPage="contacts"
        onLanguageChange={() => {
          /** Update flag to trigger language change of form error messages */
          setLanguageChangedFormTrigger(!languageChangedFormTrigger);
          setIsLanguageChanged(true);
        }}
      />
    </>
  );
}

export default Contacts;
