import { useTranslation } from "react-i18next";
import ContactMeForm from "../components/contacts/ContactMeForm";
import "../styles/pages/contacts/Contacts.css";
import FloatingLanguageSwitch from "../components/common/FloatingLanguageSwitch";
import { useState } from "react";

function Contacts() {
  const CONTACTS_PAGE_ID = "contacts-page";

  const [languageChangedFormTrigger, setLanguageChangedFormTrigger] = useState<boolean>(false);

  const { t } = useTranslation("pages/Contacts");

  return (
    <>
      <div id={CONTACTS_PAGE_ID}>
        <h1>{t("TITLE")}</h1>
        <p>{t("CONTACT_ME_DISCLAIMER")}</p>
        <ContactMeForm triggerErrorMessagesLanguageUpdate={languageChangedFormTrigger} />
      </div>
      <FloatingLanguageSwitch
        onLanguageChange={() => {
          /** Update flag to trigger language change of form error messages */
          setLanguageChangedFormTrigger(!languageChangedFormTrigger) 
        }}
      />
    </>
  );
}

export default Contacts;
