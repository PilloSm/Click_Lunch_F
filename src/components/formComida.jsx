"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function FormComida({ comidas }) {
  const router = useRouter();
  const [comida, setComida] = useState({
    cantidad: 1,
    id_comida: comidas,
  });

  const [platillo, setPlatillo] = useState({
    nombre: "",
    descripcion: "",
    precio: 0,
    imagen: "",
  });
  const { data: session, update } = useSession();
  const fetchData = () => {
    try {
      axios
        .get(`http://localhost:3000/api/apiCliente/menu/${comidas}`)
        .then((response) => {
          const data = response.data;
          if (data) {
            setPlatillo(data[0]);
          } else {
            console.error("La respuesta no contiene datos válidos.");
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [comidas.id_comida, session]);

  const handleChange = (e) => {
    setComida({
      ...comida,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <div className="absolute w-[325px] top-[64px] left-[298px] font-nunito font-semibold text-black text-[64px] rounded-[40px] leading-normal tracking-normal whitespace-nowrap">
        {platillo.nombre}
      </div>
      <p className="absolute w-[595px] h-[277px] top-[201px] left-[115px] resize-none bg-[white] text-[34px]">
        {platillo.descripcion}
      </p>

      <p className="absolute w-[325px] top-[537px] left-[119px] font-nunito font-nunito font-bold text-black text-[64px] leading-normal tracking-normal">
        $
      </p>
      <input
        className="absolute w-[325px] top-[537px] left-[159px] font-nunito font-nunito font-bold text-black text-[64px] leading-normal tracking-normal bg-[white]"
        disabled
        name="precio"
        value={platillo.precio}
        onChange={handleChange}
      />

      <div className="absolute w-[274px] h-[84px] top-[652px] left-[583px] rounded-[10px]">
        <input
          type="number"
          className="text-center text-[42px] absolute w-[274px] h-[84px] top-0 left-0 bg-white rounded-[10px] border-4 border-black"
          name="cantidad"
          min={1}
          max={platillo.cantidad_preparable}
          onChange={handleChange}
          required
        />
      </div>

      <div className="absolute w-[589px] h-[373px] top-[139px] left-[790px] bg-white">
        <img
          className="absolute w-[546px] h-[323px] top-[27px] left-[24px] object-cover;"
          src={"img/compra/image-9.png"}
          alt="Food"
        />
      </div>

      <img src={platillo.imagen} alt={platillo.nombre}></img>

      <button
        onClick={() => {
          if (session) {
            const precioT =
              session.user.carrito.total + platillo.precio * comida.cantidad;
            const nuvo = {
              nombre: platillo.nombre,
              subtotal: platillo.precio * comida.cantidad,
              cantidadM: platillo.cantidad_preparable,
            };
            const elemento = { ...comida, ...nuvo };
            const cart = [...session.user.carrito.comidas, elemento];
            const carritoF = {
              total: precioT,
              comidas: cart,
            };
            update({ carrito: carritoF });
            router.push("/client/carrito");
          }
        } }
        className="absolute w-[698px] h-[95px] top-[850px] left-[371px] bg-[#25a18ee6] rounded-full border-none cursor-pointer"
      >
        <div className="absolute w-[523px] h-[20px] top-[37px] left-[87px] font-poppins-bold text-[white] text-[32px] text-center leading-[20px]">
          Agregar
        </div>
      </button>
    </>
  );
}
