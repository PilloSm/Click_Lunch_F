"use client";
import React, { useState } from "react";
import BtnOpciones from "../../../components/BtnOpciones";
import { useSession } from "next-auth/react";
import BtonPedir from "@/components/btonPedis";

function Carrito() {
  const { data: session, update } = useSession();
  const carrito = session.user.carrito;

  return (
    <div className="bg-white flex flex-col items-center w-full">
  <div className="bg-white w-full md:w-[768px] lg:w-[1024px] xl:w-[1440px] h-auto relative">
    {/* <BtnOpciones /> */}

    <div className="absolute w-full md:w-[80%] top-[50px] left-1/2 transform -translate-x-1/2 font-nunito font-normal text-black text-[24px] md:text-[48px] text-center leading-normal tracking-normal">
      Carrito
    </div>
    {session.user.carrito.total > 0 ? (
      <table className="absolute text-center top-[160px] w-full md:w-[80%] mt-5 border-collapse left-1/2 transform -translate-x-1/2">
        <thead>
          <tr>
            <th className="border border-gray-300 justify-center bg-[#25a18ee6] text-[white] text-center py-3 px-4 text-[14px] md:text-[18px]">
              Producto
            </th>
            <th className="border border-gray-300 justify-center bg-[#25a18ee6] text-[white] text-center py-3 px-4 text-[14px] md:text-[18px]">
              Cantidad
            </th>
            <th className="border border-gray-300 justify-center bg-[#25a18ee6] text-[white] text-center py-3 px-4 text-[14px] md:text-[18px]">
              Subtotal
            </th>
            <th className="border border-gray-300 justify-center bg-[#25a18ee6] text-[white] text-center py-3 px-4 text-[14px] md:text-[18px]">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {carrito.comidas.map((item) => (
            <tr key={item.id_comida}>
              <td className="text-[12px] md:text-[16px]">{item.nombre}</td>
              <td className="text-[12px] md:text-[16px]">{item.cantidad}</td>
              <td className="text-[12px] md:text-[16px]">${item.subtotal}</td>
              <td>
                <button
                  className="md:w-[32px] md:h-[32px] w-[24px] h-[24px]"
                  onClick={() => {
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

                    handleE(item.id_comida);
                  }}
                >
                  <img
                    src="/img/carrito/borrar-1.png"
                    alt="Borrar"
                    className="w-full h-full"
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <div className="absolute max-w-full md:max-w-500 top-[195px] left-1/2 transform -translate-x-1/2 bg-[#DDDDDD] border-1 border-ddd p-4 md:p-20 rounded-[20px]">
        <h1 className="text-[18px] md:text-[24px] text-3f3131">¡No hay nada en el carrito!</h1>{" "}
      </div>
    )}

    <div className="absolute w-[80%] md:w-[520px] h-[90px] top-[645px] left-1/2 transform -translate-x-1/2 bg-[#DDDDDD] border-1 border-ddd rounded-[20px]">
      <div className="absolute text-[18px] md:text-[24px] text-3f3131 top-[30px] left-[20px]">Total</div>
      <div className="absolute text-[18px] md:text-[24px] text-3f3131 top-[30px] right-[50px]">${session.user.carrito.total}</div>
    </div>

      <BtonPedir
        onClick={() => {
          const handleE = () => {
            const carritoN = {
              total: 0,
              comidas: [],
            };
            update({ carrito: carritoN });
          };
          handleE(item.id_comida);
        }}
        saldo={session.user.saldo}
        carrito={session.user.carrito}
        id_cuenta={session.user.id_cuenta}
      />
  </div>
</div>
  );
}

export default Carrito;
