"use client";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import BtnOpcionesAdmin from "@/components/BtnOpcionesAdmin";
import AlimentoCrear from "@/components/AlimentoCrear";


export default function IngresarComida() {
  const [datos, setDatos] = useState({
    nombre: "",
    descripcion: "",
    precio: 0,
  });
  const handleCahnge = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white w-[1440px] h-[1024px] relative">
      <BtnOpcionesAdmin/>
        
        <AlimentoCrear/>

      </div>
    </div>
  );
}
