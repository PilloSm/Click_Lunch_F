"use client";

import BtnOpciones from "@/components/BtnOpciones";
import DatosCuenta from "@/components/DatosCuenta";
import { signOut, useSession } from "next-auth/react";
export default function Informacion(request) {
  const { data: session, update } = useSession();

  const { searchParams } = request;
  if (searchParams.borrar === "si") {
    const borrar = { total: 0, comidas: [] };
    update({ carrito: borrar });
  }
  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white w-[1440px] h-[1024px] relative">
        <div className="absolute w-[251px] top-[57px] left-[594px] font-nunito font-normal text-black text-[64px] leading-normal tracking-normal">
          Mi perfil
        </div>
        <BtnOpciones />
        {session ? (
          <div>
            <DatosCuenta
              id_cuenta={session.user.id_cuenta}
              usuarios={session.user.nombre}
              correo={session.user.email}
              saldo={session.user.saldo}
            />
            <button
              onClick={() => {
                signOut();
              }}
              className="absolute w-[450px] h-[77px] top-[740px] left-[495px] bg-[#25a18ee6] rounded-full border-none cursor-pointer"
            >
              <div className="absolute w-[338px] h-[20px] top-[28px] left-[56px] font-poppins font-bold text-white text-[24px] text-center leading-[20px]">
                Cerrar sesión
              </div>
            </button>
          </div>
        ) : (
          <div className="absolute max-w-500 top-[195px] left-[430px] bg-gray border-1 border-ddd p-20">
            <h1 className="text-3xl text-3f3131">No hay cuenta</h1>{" "}
          </div>
        )}
      </div>
    </div>
  );
}
