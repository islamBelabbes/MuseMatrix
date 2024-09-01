import NavBar from "./_components/nav-bar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="app flex flex-col gap-3">
      <NavBar />
      <div>{children}</div>
    </div>
  );
}
