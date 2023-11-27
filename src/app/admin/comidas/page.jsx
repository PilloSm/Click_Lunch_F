"use client";

import BtnOpcionesAdmin from "@/components/BtnOpcionesAdmin";
import AlimentoCrear from "@/components/AlimentoCrear";
import { signOut } from "next-auth/react";

export default function IngresarComida() {
  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white w-[1440px] h-[1024px] relative">
        <BtnOpcionesAdmin />

        <AlimentoCrear />

      </div>
    </div>
  );
}
