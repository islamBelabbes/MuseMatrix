import { useEffect } from "react";

export default function useUnsavedChangesWarning(condition) {
  useEffect(() => {
    const beforeUnloadHandler = (e) => {
      if (condition) {
        e.preventDefault();
        e.returnValue = true;
      }
    };

    window.addEventListener("beforeunload", beforeUnloadHandler);

    return () => {
      window.removeEventListener("beforeunload", beforeUnloadHandler);
    };
  }, [condition]);
}
