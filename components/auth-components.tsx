import { signIn, signOut } from "next-auth/react";
import { Button } from "./ui/button";

export function SignIn({
  provider,
  ...props
}: { provider?: string } & React.ComponentPropsWithRef<typeof Button>) {
  return (
    <div>
      <button
        onClick={() => {
          signIn("google");
        }}
      >
        Sign in with google{" "}
      </button>
      <button
        onClick={() => {
          signIn("github");
        }}
      >
        Sign in with github{" "}
      </button>
    </div>
  );
}

export function SignOut(props: React.ComponentPropsWithRef<typeof Button>) {
  return (
    <div>
      <button
        onClick={() => {
          signOut();
        }}
      ></button>
    </div>
  );
}
