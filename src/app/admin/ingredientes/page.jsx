"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function Ingredientes() {
  const [datos, setDatos] = useState({
    nombre: "",
    cantidad: "",
    precio: 0,
    unidad: "",
  });
  const [unidades, setUnidades] = useState([]); // Estado para almacenar las unidades
  const router = useRouter();

  useEffect(() => {
    const cargarUnidades = async () => {
      const unidadesData = await dats();
      setUnidades(unidadesData);
    };
    cargarUnidades();
  }, []);

  const handleCahnge = (e) => {
    setDatos((prevDatos) => ({
      ...prevDatos,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      "http://localhost:3000/api/apiCafeteria/crearIngrediente",
      datos
    );
    if (res.data) {
      const conf = Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "La creación del ingrediente fue exitosa.",
      });
      router.push('/admin/pedidos');
    }
  };

  const dats = async () => {
    const res = await axios.get(
      "http://localhost:3000/api/apiCafeteria/crearIngrediente"
    );
    return res.data;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="absolute w-[219px] top-[211px] left-[523px] font-poppins font-normal text-[#09090999] text-[16px] leading-[24px] tracking-[0.15px]">
        Nombre
      </div>
      <div className="absolute w-[219px] top-[341px] left-[523px] font-poppins font-normal text-[#09090999] text-[16px] leading-[24px] tracking-[0.15px]">
        Cantidad
      </div>
      <div className="absolute w-[219px] top-[471px] left-[523px] font-poppins font-normal text-[#09090999] text-[16px] leading-[24px] tracking-[0.15px]">
        Unidad
      </div>

      <div className="absolute w-[450px] h-[48px] top-[242px] left-[495px] bg-white border border-[#797979]">
        <input
          name="nombre"
          placeholder="Nombre"
          className="absolute w-[438px] h-[35px] top-[5px] left-[5px] font-nunito font-normal text-black bg-[white] text-[24px] leading-normal tracking-normal border-none outline-none"
          onChange={handleCahnge}
        />
      </div>
      <div className="absolute w-[450px] h-[48px] top-[373px] left-[495px] bg-white border border-[#797979]">
        <select
          name="unidad"
          className="absolute w-[438px] h-[35px] top-[4px] left-[5px] font-nunito font-normal bg-[white] text-black text-[24px] leading-normal tracking-normal border-none outline-none"
          onChange={handleCahnge}
        >
          <option value="">Seleccionar Unidad</option>
          {unidades.map((unidad) => (
            <option key={unidad.id_unidad} value={unidad.id_unidad}>
              {unidad.nombre}
            </option>
          ))}
        </select>
      </div>
      <div>
        <input
          name="cantidad"
          placeholder="cantidad"
          type="number"
          onChange={handleCahnge}
        />
      </div>
      <div>
        <input
          name="precio"
          placeholder="precio"
          type="number"
          onChange={handleCahnge}
        />
      </div>
      <button className="absolute w-[450px] h-[77px] top-[670px] left-[495px] bg-[#25a18ee6] rounded-full border-none cursor-pointer">
        <div className="absolute w-[338px] h-[20px] top-[28px] left-[56px] font-poppins font-bold text-white text-[24px] text-center leading-[20px]">
          Crear ingrediente
        </div>
      </button>
    </form>
  );
}
