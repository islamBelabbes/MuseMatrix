import { Protect } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

async function IsAdmin({ children }) {
  const isAdmin = auth().sessionClaims?.metadata.isAdmin;
  return (
    <Protect condition={() => isAdmin} fallback={<span>unAuthorized</span>}>
      {children}
    </Protect>
  );
}

export default IsAdmin;
