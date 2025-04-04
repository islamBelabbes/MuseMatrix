"use client";

import { ReachQueryProvider } from "./react-query-provider";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "react-hot-toast";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ReachQueryProvider>
        {children}
        <Toaster />
        <ProgressBar
          height="4px"
          color="#2563eb"
          options={{ showSpinner: false }}
          shallowRouting
        />
      </ReachQueryProvider>
    </ThemeProvider>
  );
}

export default Providers;
