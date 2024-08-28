import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "karmelavenon@gmail.com",
    to: email,
    subject: "2FA Code",
    html: `<p>Your 2FA code: ${token}</p>`,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "karmelavenon@gmail.com",
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "karmelavenon@gmail.com",
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
  });
};

export const CreateProduct = async (email: string, nom: string) => {
  await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: email,
    subject: "Création de votre produit sur Project HBI",
    html: `<p>Votre produit ${nom} a été mis en examen. vous reçevrez un mail lorsqu'il sera confirmé. Merci</p>`,
  });
};

export const AttribueProduct = async (email: string, nom: string) => {
  await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: email,
    subject: "Création de votre produit sur Project HBI",
    html: `<p>Votre produit ${nom} a été mis en examen. vous reçevrez un mail lorsqu'il sera confirmé. Merci</p>`,
  });
};

//acheter un produit
//collis livrer par l'agent

//accepter produit on envoie deux mails, un a celui qui a publié le produit et le second a l'agent
// supprimer le produit
//confier un agent au porduit

// agent confirmation de reception de colis
