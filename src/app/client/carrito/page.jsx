"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import Navbar from "../../../components/Navbar";
import BtnOpciones from "../../../components/BtnOpciones";
import { useSession } from "next-auth/react";
import BtonPedir from "@/components/btonPedis";
import TablaCarrito from "@/components/TablaCarrito";

function Carrito() {
  const { data: session, update } = useSession();
console.log(session)
  const carrito = session.user.carrito;

  const handleE = (id_comida) => {
    const carritoFiltrado = carrito.comidas.filter(
      (item) => item.id_comida !== id_comida
    );

    const totalActualizado = carritoFiltrado.reduce(
      (total, item) => total + item.subtotal,
      0
    );
    const carritoN = {
      total: totalActualizado,
      comidas: carritoFiltrado,
    };
    update({ carrito: carritoN });
  };
  return (
    <div className="bg-white flex flex-row justify-center w-full;">
      <div className="bg-white w-[1440px] h-[1024px] relative">
        <BtnOpciones />

        <div className="absolute w-[431px] top-[50px] left-[504px] font-nunito font-normal text-black text-[64px] text-center leading-normal tracking-normal">
          Carrito
        </div>
        {session.user.carrito.total > 0 ? (
          <table className="absolute text-center top-[160px] w-1/2 mt-5 border-collapse left-1/2 transform -translate-x-1/2">
            <thead>
              <tr>
                <th className="border border-gray-300 justify-center bg-[#25a18ee6] text-[white] text-center py-2 px-3">
                  Producto
                </th>
                <th className="border border-gray-300 justify-center bg-[#25a18ee6] text-[white] text-center py-2 px-3">
                  cantidad
                </th>
                <th className="border border-gray-300 justify-center bg-[#25a18ee6] text-[white] text-center py-2 px-3">
                  subtotal
                </th>
              </tr>
            </thead>
            <tbody>
              {carrito.comidas.map((item) => (
                <>
                  <TablaCarrito
                    alimento={item.id_comida}
                    cantidad={item.cantidad}
                    subtotal={item.subtotal}
                  />
                  <button onClick={handleE(item.id_comida)}>Eliminar</button>
                </>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="absolute max-w-500 top-[195px] left-[430px] bg-[#DDDDDD] border-1 border-ddd p-20">
            <h1 className="text-3xl text-3f3131">
              ¡No hay nada en el carrito!
            </h1>{" "}
          </div>
        )}

        <div className="absolute top-[655px] left-[370px] font-nunito font-normal text-black text-[30px] text-center leading-normal tracking-normal whitespace-nowrap">
          {session.user.carrito.total}
        </div>
        <div className="babsolute w-[893px] h-[88px] top-[743px] left-[562px]">
          <BtonPedir
            carrito={session.user.carrito}
            id_cuenta={session.user.id_cuenta}
          />
        </div>
      </div>
    </div>
  );
}

export default Carrito;
