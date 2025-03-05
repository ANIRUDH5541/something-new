import { NextRequest, NextResponse } from "next/server";
import { POST_purchase } from "@/app/lib/action";

export async function POST(req: NextRequest) {
  try {
    const { items } = await req.json();
    
    if (!items || !Array.isArray(items)) {
      return NextResponse.json(
        { message: "Invalid items data" },
        { status: 400 }
      );
    }

    const result = await POST_purchase(items);

    return NextResponse.json(result, { status: 200 });

  } catch (error: any) {
    console.error("Purchase API error:", error);
    return NextResponse.json(
      { message: error.message || "Error processing purchase" },
      { status: 500 }
    );
  }
}