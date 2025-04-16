import NavBar from "./_components/nav-bar";

import "@/styles/prosemirror.css";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="app flex flex-col gap-3">
      <NavBar />
      <div>{children}</div>
    </main>
  );
}
