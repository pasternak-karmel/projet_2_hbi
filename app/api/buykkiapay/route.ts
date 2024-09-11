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

    const verificationResponse = await k.verify("Y3irGKg2C");
    console.log("Verification Response:", verificationResponse);

    if (verificationResponse && verificationResponse.status === "SUCCESS") {
      console.log("Payment Verified:", verificationResponse);

      return NextResponse.json(
        {
          message: "Payment verified",
          data: verificationResponse,
        },
        { status: 200 }
      );
    } else {
      console.error("Payment verification failed:", verificationResponse);

      return NextResponse.json(
        { error: "Payment verification failed", details: verificationResponse },
        { status: 401 }
      );
    }
  } catch (error: any) {
    console.error("Error verifying payment:", error);

    return NextResponse.json(
      {
        error: "An error occurred during payment verification",
        details: error.message || error,
      },
      { status: 500 }
    );
  }
}
