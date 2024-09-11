import { ReachQueryProvider } from "./react-query-provider";
import { ThemeProvider } from "./theme-provider";

function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ReachQueryProvider>{children}</ReachQueryProvider>
    </ThemeProvider>
  );
}

export default Providers;
