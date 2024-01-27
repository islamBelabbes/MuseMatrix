"use client";
import DarkModeProvider from "@/context/DarkModeProvider";
import GlobalModalProvider from "@/context/GlobalModalProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Next13ProgressBar } from "next13-progressbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ClerkProvider } from "@clerk/nextjs";
import { Suspense } from "react";
import { ThemeProvider } from "next-themes";

const queryClient = new QueryClient();

function Providers({ children }) {
  return (
    <Suspense>
      <QueryClientProvider client={queryClient}>
        <ClerkProvider>
          <ThemeProvider attribute="class">
            <ToastContainer />
            <GlobalModalProvider>{children}</GlobalModalProvider>
            <Next13ProgressBar
              height="4px"
              color="#0A2FFF"
              options={{ showSpinner: true }}
            />
            <ReactQueryDevtools initialIsOpen={true} />
          </ThemeProvider>
        </ClerkProvider>
      </QueryClientProvider>
    </Suspense>
  );
}

export default Providers;
