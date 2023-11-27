import { conn } from "@/libs/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const res = await conn.query(`SELECT
    m.id_pedido,
    m.estado,
    d.cantidad,
    c.nombre AS nombre_alimento
FROM
    m_pedidos m
JOIN
    det_pedido d ON m.id_pedido = d.id_pedido
JOIN
    cat_comidas c ON d.id_comida = c.id_comidas
WHERE 
    m.estado=${params.id}`);
    return NextResponse.json(res[0]);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Ha ocurrido un error" },
      { status: 500 }
    );
  }
}
