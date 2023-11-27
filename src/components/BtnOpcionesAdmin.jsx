"use client";
import React from "react";
import { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
const BtnOpcionesAdmin = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-between py-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute w-[80px] h-[80px] top-[63px] left-[78px] cursor-pointer bg-transparent border-none cursor-[5]"
        >
          <img src="img/menu/btn-opciones.png" alt="menu" />
        </button>

        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-start z-10">
            <div className="bg-gray-900 w-64 h-screen p-4">
              <button
                onClick={() => setIsOpen(false)}
                className="text-white text-lg mb-4"
              >
                ✖️
              </button>
              <nav className="space-y-4">
                <Link
                  href="/menu-admin"
                  className="text-gray-300 hover:bg-gray-800 hover:border-l-4 hover:border-gray-300 hover:text-white block p-2 transition duration-200"
                >
                  <img
                    className="pl-[4px]"
                    src="/img/sidebar/casa-2.png"
                    alt=""
                  />
                  Menú
                </Link>
                <Link
                  href="/pedidos"
                  className="text-gray-300 hover:bg-gray-800 hover:border-l-4 hover:border-gray-300 hover:text-white block p-2 transition duration-200"
                >
                  <img
                    className="pl-[4px]"
                    src="/img/sidebar/icon-pedidos.png"
                    alt=""
                  />
                  Pedidos
                </Link>
                <Link
                  href="/agregar-saldo-admin"
                  className="text-gray-300 hover:bg-gray-800 hover:border-l-4 hover:border-gray-300 hover:text-white block p-2 transition duration-200"
                >
                  <img
                    className="pl-[4px]"
                    src="/img/sidebar/cartera-icon2.png"
                    alt=""
                  />
                  Agregar Saldo
                </Link>
                <Link
                  href="/cuenta"
                  className="text-gray-300 hover:bg-gray-800 hover:border-l-4 hover:border-gray-300 hover:text-white block p-2 transition duration-200"
                >
                  <img
                    className="pl-[4px]"
                    src="/img/sidebar/user-icon.png"
                    alt=""
                  />
                  Administrador
                </Link>
                <button
                  onClick={() => {
                    signOut();
                  }}
                >
                  Cerrar sesion
                </button>
              </nav>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BtnOpcionesAdmin;
