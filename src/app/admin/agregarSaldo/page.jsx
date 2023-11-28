"use client";
import BtnOpcionesAdmin from "../../../components/BtnOpcionesAdmin";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

function AgregarSaldoAdmin() {
  const [datos, setDatos] = useState({
    saldoMas: 0,
    id: "",
  });

  const handleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const confirmacion = await Swal.fire({
      title: "¿Son correctos los datos?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "No",
    });

    if (confirmacion.isConfirmed) {
      try {
        const res = await axios.put(
          "http://localhost:3000/api/apiCafeteria/agregarSaldo",
          datos
        );

        if (res.data.status === 200) {
          sweetAlert();

          await Swal.fire({
            title: "¡Éxito!",
            text: "La solicitud se ha completado exitosamente.",
            icon: "success",
          });
        } else {
          console.error("Error en la respuesta:", res.data);
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    }
  };

  return (
    <div className="bg-bg-[#25a18ee6] flex flex-row justify-center w-full">
      <div className="bg-white w-[1440px] h-[1024px] relative">
        <div className="absolute w-[431px] top-[80px] left-[504px] font-nunito font-normal text-black text-[64px] text-center leading-normal tracking-normal">
          Agregar Saldo
        </div>

        <div className="absolute top-[230px] left-[657px] font-nunito font-normal text-black text-[30px] text-center leading-normal tracking-normal whitespace-nowrap">
          $
        </div>
        <form onSubmit={handleSubmit}>
          <input name="id" onChange={handleChange} />
          <div className="absolute w-[206px] h-[49px] top-[230px] left-[687px] rounded-[10px]">
            <select
              className="w-[100px] h-[49px] text-[28px] cursor-pointer py-2 px-3 h-[42px] outline-none border-0 rounded-none bg-[#f0f0f0] text-black text-base font-nunito border-2 border-[rgba(0,0,0,0.2)] focus:border-[#47cdb8] rounded-[12px] relative transition-all duration-200 ease-in"
              name="saldoMas"
              onChange={handleChange}
            >
              <option selected>20</option>
              <option>50</option>
              <option>100</option>
              <option>200</option>
            </select>
          </div>
          <button className="absolute w-[660px] h-[95px] top-[500px] left-[400px] bg-[#25a18ee6] rounded-full border-none cursor-pointer">
            <div className="absolute w-[523px] h-[20px] top-[37px] left-[80px] font-poppins-bold text-[white] text-[32px] text-center leading-[20px]">
              Agregar
            </div>
          </button>
        </form>
      </div>
    </div>
  );
}

export default AgregarSaldoAdmin;
