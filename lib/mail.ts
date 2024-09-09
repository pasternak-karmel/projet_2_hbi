import { Resend } from "resend";
import { useQRCode } from "next-qrcode";
// import fs from "fs";
// import QrCode from "./qrCode";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL;
// const { Image } = useQRCode();

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
    from: "Acme <onboarding@resend.dev>",
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

export const AttribueProduct = async (
  emailAgent: string,
  emailUser: string,
  nomArticle: string
) => {
  await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: emailAgent,
    subject: "Un produit vous êtes assigné",
    html: `<p>Le produit ${nomArticle} Vous a été assigné. Veuillez prendre contact avec le vendeur dans la section mes livraisons. Merci</p>`,
  });
  // const myImage = QrCode();
  await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: emailUser,
    subject: "Création de votre produit sur Project HBI",
    html: `<p>Votre produit ${nomArticle} a été accepté. Un agent vous contactera pour prendre les dispositions avec vous. Merci</p>`,
    // attachments: [
    //   {
    //     filename: "qrcode.png",
    //     content: myImage,
    //   },
    // ],
  });
};

export const CreateLivreur = async (email: string, password: string) => {
  await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: email,
    subject: "Academy TechSeed",
    html: `<p>Vous avez été assigné comme livreur par l'administrateur.<br> Voici vos informations de connexion:<br>Email: ${email}<br>Mot de passe: ${password}</p>`,
  });
};

//acheter un produit
//collis livrer par l'agent

//accepter produit on envoie deux mails, un a celui qui a publié le produit et le second a l'agent
// supprimer le produit
//confier un agent au porduit

// agent confirmation de reception de colis
