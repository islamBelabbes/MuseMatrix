import { Protect, currentUser } from "@clerk/nextjs";

async function IsAdmin({ children }) {
  const user = await currentUser();
  const isAdmin = user?.publicMetadata.isAdmin;
  return (
    <Protect condition={() => isAdmin} fallback={<span>unAuthorized</span>}>
      {children}
    </Protect>
  );
}

export default IsAdmin;
