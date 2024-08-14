import { signIn } from "next-auth/react";

export default function AccessDenied() {
  return (
    <>
      <h1>Accès refusé</h1>
      <p>
        <a
          href="/api/auth/signin"
          onClick={(e) => {
            e.preventDefault();
            signIn();
          }}
        >
          Tu dois te connecter avant de voir la page
        </a>
      </p>
    </>
  );
}
