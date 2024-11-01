import { Email, Home, Menu } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { Action, Fab } from "react-tiny-fab";
import { FloatingElement } from "./FloatingElements";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type Page = "homepage" | "contacts";

interface FloatingMenuProps {
  currentPage: Page;
  closeAllOtherFloatingMenus: (keepOpen: FloatingElement) => void;
  triggerClose: boolean;
}

function FloatingMenu({ currentPage, closeAllOtherFloatingMenus, triggerClose }: FloatingMenuProps) {
  const FLOATING_MENU_ID = "__floating__menu";

  const pagesIconsMap: { [key: string]: JSX.Element } = {
    home: <Home />,
    contacts: <Email />,
  };

  const { t } = useTranslation("Menu");
  const navigate = useNavigate();

  const isOpen = () => {
    const floatingLanguageSwitch = document.getElementById(FLOATING_MENU_ID);
    return floatingLanguageSwitch?.classList.contains('open') || false;
  }

  const open = () => {
    closeAllOtherFloatingMenus("menu");

    const floatingLanguageSwitch = document.getElementById(FLOATING_MENU_ID);
    floatingLanguageSwitch?.classList.add('open');
  }

  const close = () => {
    const floatingLanguageSwitch = document.getElementById(FLOATING_MENU_ID);
    floatingLanguageSwitch?.classList.remove('open');
  }

  /**
   * Close the floating language switch when the trigger changes
   * */
  useEffect(() => close(), [triggerClose]);

  return (
    <Fab
      event="click"
      icon={<Menu />}
      style={{ top: 10, right: 10 }}
      alwaysShowTitle={true}
      onClick={() => {
        if(isOpen()) {
          close();
        } else {
          open();
        }
      }}
      {...{ id: FLOATING_MENU_ID }}
    >
      <Action
        id={currentPage === "homepage" ? `__selected_floating__menu-page${currentPage}` : undefined}
        text={t("homepage.NAME")}
        children={pagesIconsMap["home"]}
        onClick={() => navigate(t("homepage.PATH"))}
      />
      <Action
        id={currentPage === "contacts" ? `__selected_floating__menu-page${currentPage}` : undefined}
        text={t("contacts.NAME")}
        children={pagesIconsMap["contacts"]}
        onClick={() => navigate(t("contacts.PATH"))}
      />
    </Fab>
  );
}

export default FloatingMenu;
export type { Page };