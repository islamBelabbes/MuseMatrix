"use client";

import { ClerkLoading, SignInButton as ClerkSignInButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

function SignInButton() {
  const pathname = usePathname();
  return (
    <>
      {/* placeholder for layout purposes */}
      <ClerkLoading>
        <button className="opacity-0 button_primary">sign In</button>{" "}
      </ClerkLoading>

      <ClerkSignInButton
        mode="modal"
        className="button_primary"
        afterSignInUrl={pathname}
        afterSignUpUrl={pathname}
      />
    </>
  );
}

export default SignInButton;
