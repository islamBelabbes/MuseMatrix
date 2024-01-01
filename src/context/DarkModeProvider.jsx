import { createContext, useContext, useLayoutEffect, useState } from "react";
import { toast } from "react-toastify";
const DarkModeContext = createContext(null);
export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context)
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  return context;
};

const NOT_READY_TOAST_ID = "notReadyDarkMode";
function DarkModeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const darkModeEnable = (options = { isEnable: true }) => {
    if (options.isEnable) {
      setDarkMode(true);
      return document.querySelector("html").classList.add("dark");
    }
    setDarkMode(false);
    return document.querySelector("html").classList.remove("dark");
  };
  const toggleDarkMode = () => {
    if (darkMode) {
      localStorage.setItem("theme", "light");
      darkModeEnable({ isEnable: false });
      toast.dismiss(NOT_READY_TOAST_ID);
    } else {
      localStorage.setItem("theme", "dark");
      darkModeEnable({ isEnable: true });
      toast.info("Dark mode is on but its not 100% ready yet 😥", {
        toastId: NOT_READY_TOAST_ID,
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  // Dark Mode persistent
  useLayoutEffect(() => {
    const theme = localStorage.getItem("theme");
    if (!theme) {
      localStorage.setItem("theme", "light");
      darkModeEnable({ isEnable: false });
    } else {
      theme === "light"
        ? darkModeEnable({ isEnable: false })
        : darkModeEnable({ isEnable: true });
    }

    setIsMounted(true);
  }, []);

  const values = {
    toggle: toggleDarkMode,
    status: darkMode,
  };
  if (!isMounted) return;
  return (
    <DarkModeContext.Provider value={values}>
      {children}
    </DarkModeContext.Provider>
  );
}

export default DarkModeProvider;
