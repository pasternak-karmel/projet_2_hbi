import { NextResponse } from "next/server";
import { kkiapay } from "@kkiapay-org/nodejs-sdk";

export async function POST(req: Request) {
  try {
    const values = await req.json();
    const { transactionId } = values;

    const k = kkiapay({
      privatekey: process.env.KKIAPAY_API_KEY as string,
      publickey: process.env.NEXT_PUBLIC_KKIAPAY_API_KEY as string,
      secretkey: process.env.KKIAPAY_SECRET_KEY as string,
      sandbox: true,
    });

    const verificationResponse = await k.verify(transactionId);

    if (verificationResponse && verificationResponse.status === "SUCCESS") {
      return NextResponse.json(
        {
          message: "Payment verified",
          data: verificationResponse,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: "Payment verification failed", details: verificationResponse },
        { status: 401 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "An error occurred during payment verification",
        details: error.message || error,
      },
      { status: 500 }
    );
  }
}
