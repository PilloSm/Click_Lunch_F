import { conn } from "@/libs/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await conn.query("SELECT * FROM cat_ingredientes");
    const result = await conn.query("select * from cat_tipos");
    const tot = { ingredientes: [...res[0]], tipos: [...result[0]] };
    const ingrediente = tot;
    return NextResponse.json(ingrediente);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Ups ha ocurrido un error" },
      { status: 500 }
    );
  }
}
