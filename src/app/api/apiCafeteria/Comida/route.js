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
    console.log();

    const result = await conn.query("INSERT INTO cat_comidas SET ?", {
      nombre: data.get("nombre"),
      tipo: data.get("tipos"),
      descripcion: data.get("descripcion"),
      precio: data.get("precio"),
      imagen: res.secure_url,
    });

    const results = {
      name: data.get("nombre"),
      description: data.get("descripcion"),
      price: data.get("precio"),
      id: result[0].insertId,
    };
    console.log(results);
    return NextResponse.json(results);
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

export async function PUT(request) {
  const data = await request.json;
  const res = await conn.query("INSERT into det_ingredientes set ?", data);
}
