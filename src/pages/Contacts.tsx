import { useTranslation } from "react-i18next";
import ContactMeForm from "../components/contacts/ContactMeForm";
import '../styles/pages/contacts/Contacts.css';

function Contacts() {
  const CONTACTS_PAGE_ID = "contacts-page";

  const { t } = useTranslation("pages/Contacts");

  return (
    <div id={CONTACTS_PAGE_ID}>
      <h1>{t("TITLE")}</h1>
      <p>{t("CONTACT_ME_DISCLAIMER")}</p>
      <ContactMeForm />
    </div>
  );
}

export default Contacts;
