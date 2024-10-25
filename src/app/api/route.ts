import { NextResponse } from "next/server";

export async function GET() {

  // You can perform any logic here if needed

  return NextResponse.json({ message: "This works~!" });

}
