import FloatingLanguageSwitch from "./FloatingLanguageSwitch";
import FloatingMenu, { Page } from "./FloatingMenu";
import "../../styles/common/components/FloatingElements.css";
import { useState } from "react";

type FloatingElement = "language-switch" | "menu";

interface FloatingElementsProps {
  currentPage: Page;
  onLanguageChange: () => void;
}

function FloatingElements({
  currentPage,
  onLanguageChange,
}: FloatingElementsProps) {
  const [floatingElementsTriggerClose, setFloatingElementsTriggerClose] =
    useState<Record<FloatingElement, boolean>>({
      "language-switch": false,
      "menu": false,
    });

  /** Update the flag for all other floating menus to trigger their close */
  const closeAllOtherFloatingMenus = (keepOpen: FloatingElement) => {
    const floatingElements: FloatingElement[] = ["language-switch", "menu"];
    floatingElements.forEach((floatingElement) => {
      if (floatingElement !== keepOpen) {
        setFloatingElementsTriggerClose((prev) => ({
          ...prev,
          [floatingElement]: !floatingElementsTriggerClose[floatingElement],
        }));
      }
    });
  }

  return (
    <>
      <FloatingLanguageSwitch
        onLanguageChange={onLanguageChange}
        closeAllOtherFloatingMenus={closeAllOtherFloatingMenus}
        triggerClose={floatingElementsTriggerClose["language-switch"]}
      />
      <FloatingMenu
        currentPage={currentPage}
        closeAllOtherFloatingMenus={closeAllOtherFloatingMenus}
        triggerClose={floatingElementsTriggerClose["menu"]}
      />
    </>
  );
}

export default FloatingElements;
export type { FloatingElement };