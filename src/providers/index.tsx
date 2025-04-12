"use client";

import { ReachQueryProvider } from "./react-query-provider";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "react-hot-toast";
import { ProgressProvider } from "@bprogress/next/app";

function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ReachQueryProvider>
        <ProgressProvider
          height="4px"
          color="#2563eb"
          options={{ showSpinner: false }}
          shallowRouting
        >
          {children}
          <Toaster />
        </ProgressProvider>
      </ReachQueryProvider>
    </ThemeProvider>
  );
}

export default Providers;
