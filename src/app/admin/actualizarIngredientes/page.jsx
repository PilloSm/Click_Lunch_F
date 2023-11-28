"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import BtnOpcionesAdmin from "@/components/BtnOpcionesAdmin";

export default function Actualizar() {
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
    setComidaN((prevComidaN) => ({
      ...prevComidaN,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>

      <BtnOpcionesAdmin/>

      <div className="absolute w-[431px] top-[52px] left-[502px] font-nunito font-normal text-black text-[60px] text-center leading-normal tracking-normal">{comidaN.nombre}</div>
      <p className="absolute w-[431px] top-[152px] left-[565px] font-nunito font-normal text-black text-[30px]">{comidaN.descripcion}</p>
      <p className="absolute w-[431px] top-[222px] left-[572px] font-nunito bold font-normal text-black text-[20px]">Precio: ${comidaN.precio}</p>

      <div className="absolute w-2500 top-[302px] left-[920px] border-t border-gray-500 w-[300px]"></div>
      <h2 className="absolute w-[431px] top-[282px] left-[592px] font-nunito font-normal text-black text-[40px]">Ingredientes:</h2>
      <div className="absolute w-2500 top-[302px] left-[200px] border-t border-gray-500 w-[300px]"></div>

      {comidaN.ingredientes.map((ingrediente, index) => (
        <div key={index}>
          <p className="absolute w-[431px] top-[362px] left-[592px] font-nunito font-normal text-black text-[30px]">{ingrediente.nombre}</p>
          <p className="absolute w-[431px] top-[502px] left-[532px] font-nunito font-normal text-black text-[18px]">Cantidad:</p>
          
          <div className="absolute w-[450px] h-[48px] top-[532px] left-[495px] bg-white border border-[#797979]">
            <input
              className="w-[431px] h-[30px] top-[5px] left-[5px] absolute"
              type="number"
              name={ingrediente.nombre}
              onChange={handleChangeCantidad}
              placeholder={ingrediente.cantidad}
            />
          </div>

          <button
            className="absolute w-[450px] h-[77px] top-[710px] left-[495px] bg-[#25a18ee6] rounded-full border-none cursor-pointer transform transition-transform duration-500 hover:scale-110"
            onClick={async () => {
              const encontrado = comidaN.ingredientes.find(
                (item) => item.id_ingrediente === ingrediente.id_ingrediente
              );

              if (encontrado) {
                encontrado.cantidad = comidaN[encontrado.nombre];
                console.log(encontrado);

                const res = await axios.put(
                  `http://localhost:3000/api/apiCafeteria/ingredientes`,
                  { cantidad: encontrado.cantidad, id_ingrediente: encontrado.id_ingrediente }
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
            <div className="absolute w-[338px] h-[20px] top-[28px] left-[56px] font-poppins font-bold text-white text-[24px] text-center leading-[20px]">Actualizar Cantidad</div>
          </button>
        </div>
      ))}
    </div>
  );
}
