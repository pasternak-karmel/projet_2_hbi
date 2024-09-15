// app/api/verify-transaction/route.ts

import { NextRequest, NextResponse } from "next/server";
import { FedaPay, Transaction } from "fedapay";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const transactionId = searchParams.get("id");

  if (!transactionId) {
    return NextResponse.json(
      { status: "error", message: "Transaction ID is missing" },
      { status: 400 }
    );
  }

  FedaPay.setApiKey(process.env.FEDA_SECRET as string);
  FedaPay.setEnvironment("sandbox");

  try {
    const transaction = await Transaction.retrieve(transactionId);
    const transactionStatus = transaction.status;

    console.log(transaction);

    return NextResponse.json({ status: transactionStatus });
  } catch (error) {
    console.error("Error verifying transaction:", error);
    return NextResponse.json(
      { status: "error", message: "Transaction verification failed" },
      { status: 500 }
    );
  }
}
