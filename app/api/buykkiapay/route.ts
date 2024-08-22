import { NextResponse } from "next/server";
import { kkiapay } from "@kkiapay-org/nodejs-sdk";

export async function POST(req: Request) {
  // const k = kkiapay({
  //   privatekey: process.env.kkiapayPublicApiKey,
  //   publickey: process.env.kkiapayPrivateApiKey,
  //   secretkey: process.env.kkiapaySecret,
  //   sandbox: true,
  // });

  // k.verify
  return NextResponse.json({ message: "Test" });
}
