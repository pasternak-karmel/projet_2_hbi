import { Resend } from "resend";
import { useQRCode } from "next-qrcode";
import QRCode from "qrcode";

const resend = new Resend(process.env.RESEND_API_KEY);

// const domain = process.env.NEXT_PUBLIC_APP_URL;
const domain = process.env.DOMAIN;

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: email,
    subject: "2FA Code",
    html: `<p>Your 2FA code: ${token}</p>`,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
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

export const CreateProduct = async (
  email: string,
  nom: string,
  aticleId: string
) => {
  const qrCodeBuffer = await QRCode.toBuffer(aticleId);

  const emailContent = `
      <p>Votre produit ${nom} a été mis en examen. vous reçevrez un mail lorsqu'il sera confirmé. Merci</p>
      <p>Un Qr Code a été join a cet mail pour la confirmation:</p>`;
  await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: email,
    subject: "Création de votre produit sur Project HBI",
    html: emailContent,
    attachments: [
      {
        filename: "qrcode.png",
        content: qrCodeBuffer.toString("base64"),
        contentType: "image/png",
      },
    ],
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
  await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: emailUser,
    subject: "Création de votre produit sur Project HBI",
    html: `<p>Votre produit ${nomArticle} a été accepté. Un agent vous contactera pour prendre les dispositions avec vous. Merci</p>`,
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
