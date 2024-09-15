import { ReachQueryProvider } from "./react-query-provider";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "react-hot-toast";

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
      </ReachQueryProvider>
    </ThemeProvider>
  );
}

export default Providers;
