import { conn } from "@/libs/db";
import { NextResponse } from "next/server";
import { processImage } from "@/libs/processImage";
import cloudinary from "@/libs/cloudinary";
export async function POST(request) {
  try {
    const data = await request.formData();
    console.log(data);
    const imagen = data.get("imagen");
    if (!imagen) {
      return NextResponse.json(
        {
          message: "Image is required",
        },
        {
          status: 400,
        }
      );
    }

    const buffer = await processImage(imagen);

    const res = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "image",
          },
          async (err, result) => {
            if (err) {
              console.log(err);
              reject(err);
            }
            resolve(result);
          }
        )
        .end(buffer);
    });

    const result = await conn.query("INSERT INTO cat_comidas SET ?", {
      nombre: data.get("name"),
      tipo: data.get("tipo"),
      descripcion: data.get("description"),
      precio: data.get("price"),
      image: res.secure_url,
    });
    const sql = 'INSERT INTO det_ingredientes (id_ingrediente, cantidad) VALUES ?';
    const query= conn.query(sql,[data.map(item=>[item.id_ingrediente, item.cantidad])])
    return NextResponse.json({
      name: data.get("name"),
      description: data.get("description"),
      price: data.get("price"),
      id: result.insertId,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
