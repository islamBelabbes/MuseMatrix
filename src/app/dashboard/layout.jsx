import "@/globals.css";
import NavBar from "./_components/NavBar";

export const metadata = {
  title: "Muse Matrix",
  description: "A Matrix for Musing Ideas",
};

export default function DashboardLayout({ children }) {
  return (
    <div className="flex flex-col gap-3 app">
      <NavBar />

      <div>{children}</div>
    </div>
  );
}
