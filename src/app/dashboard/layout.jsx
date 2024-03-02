import "@/globals.css";
import NavBar from "./_components/NavBar";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
  title: "Muse Matrix",
  description: "A Matrix for Musing Ideas",
};

export default function DashboardLayout({ children }) {
  return (
    <ClerkProvider>
      <div className="flex flex-col gap-3 app">
        <NavBar />
        <div>{children}</div>
      </div>
    </ClerkProvider>
  );
}
