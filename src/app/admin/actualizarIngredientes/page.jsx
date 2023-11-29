"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import BtnOpcionesAdmin from "@/components/BtnOpcionesAdmin";
import { esNumero } from "@/libs/val";

export default function Actualizar() {
  const [error, setError] = useState("");
  const [comidaN, setComidaN] = useState({
    nombre: "",
    descripcion: "",
    precio: 0,
    ingredientes: [],
  });

  useEffect(() => {
    axios.get(`/api/apiCafeteria/ingredientes`).then((res) => {
      const { nombre, descripcion, precio, ingredientes } = res.data;
      setComidaN({
        nombre,
        descripcion,
        precio,
        ingredientes,
      });
    });
  }, []); // Añadí un arreglo vacío para que el efecto se ejecute solo una vez al montar el componente

  const handleChangeCantidad = (e) => {
    if (!esNumero(parseInt(e.target.value, 10))) {
      setError("dka");
      return;
    }
    setComidaN((prevComidaN) => ({
      ...prevComidaN,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <div>
        <BtnOpcionesAdmin />

        <div className="absolute w-[431px] top-[52px] left-[502px] font-nunito font-normal text-black text-[60px] text-center leading-normal tracking-normal">
          {comidaN.nombre}
        </div>
        <p className="absolute w-[431px] top-[152px] left-[565px] font-nunito font-normal text-black text-[30px]">
          {comidaN.descripcion}
        </p>
        <p className="absolute w-[431px] top-[222px] left-[572px] font-nunito bold font-normal text-black text-[20px]">
          Precio: ${comidaN.precio}
        </p>

        <div className="absolute w-2500 top-[302px] left-[920px] border-t border-gray-500 w-[300px]"></div>
        <h2 className="absolute w-[431px] top-[282px] left-[592px] font-nunito font-normal text-black text-[40px]">
          Ingredientes:
        </h2>
        <div className="absolute w-2500 top-[302px] left-[200px] border-t border-gray-500 w-[300px]"></div>

        {comidaN.ingredientes.map((ingrediente, index) => (
          <div key={index}>
            <p>{ingrediente.nombre}</p>
            <p>Cantidad:</p>

            <div>
              <input
                type="number"
                name={ingrediente.nombre}
                onChange={handleChangeCantidad}
                placeholder={ingrediente.cantidad}
              />
            </div>

            <button
              className="flex bg-black absolute h-6 gap-x-56"
              onClick={async () => {
                const encontrado = comidaN.ingredientes.find(
                  (item) => item.id_ingrediente === ingrediente.id_ingrediente
                );

                if (encontrado) {
                  encontrado.cantidad = comidaN[encontrado.nombre];
                  console.log(encontrado.cantidad);

                  const res = await axios.put(
                    `http://localhost:3000/api/apiCafeteria/ingredientes`,
                    {
                      cantidad: encontrado.cantidad,
                      id_ingrediente: encontrado.id_ingrediente,
                    }
                  );

                  setComidaN((prevComidaN) => ({
                    ...prevComidaN,
                    ingredientes: [...prevComidaN.ingredientes],
                  }));
                } else {
                  alert("</3");
                }
              }}
            >
              zaz
            </button>
          </div>
        ))}
      </div>
      <table>
        //tabla para ver entradas y salidas
      </table>
    </>
  );
}
