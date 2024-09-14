import { adminYears } from "@/actions/admin";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const metrics = await adminYears();

    return NextResponse.json({
      grossRevenue: metrics.grossRevenue,
      averageOrderValue: metrics.averageOrderValue,
      trailingYearRevenue: metrics.trailingYearRevenue,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching order metrics" },
      { status: 500 }
    );
  }
}
