"use client";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";
import { User, Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  esContrasenaValida,
  esCorreoElectronico,
  soloLetras,
} from "@/libs/val";
export default function Registrar() {
  const router = useRouter();
  const [datos, setDatos] = useState({
    nombre: "",
    email: "",
    password: "",
    password2: "",
  });

  const handleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!datos.nombre || !datos.email || !datos.password || !datos.password2) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    // Validar el formato del correo
    if (!esCorreoElectronico(datos.email)) {
      setError("Ingresa un correo electrónico válido.");
      return;
    }

    // Validar la contraseña
    if (!esContrasenaValida(datos.password)) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (!soloLetras(datos.nombre)) {
      setError("Nombre invalido");
      returnS;
    }

    // Validar que las contraseñas coincidan
    if (datos.password !== datos.password2) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    console.log(datos.password, datos.password2);
    if (datos.password === datos.password2) {
      console.log(datos);
      const res = await axios.post(
        "http://localhost:3000/api/apiCliente/registrar",
        {
          ...datos,
          redirect: false,
        }
      );
      console.log(res);
      if (res.status === 200) {
        const res = await signIn("credentials", {
          nombre: datos.nombre,
          email: datos.email,
          password: datos.password,
          redirect: false,
        });
        if (res.error) console.log(res.error);
        if (res.status === 200)
          router.push("http://localhost:3000/client/informacion");
      }
    } else {
      alert("Contraseñas no hacen match <3");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full bg-cl-1 bg-repeat h-screen flex justify-center items-center ">
        <div className="p-5 bg-white m-10 border-2 border-[#25a18ee6] rounded-md lg:w-3/12 flex flex-col items-center">
          <div className="text-2xl text-[#25a18ee6] font-semibold ">
            Registro
          </div>
          <img
            className="w-64"
            src="https://i.ibb.co/g9czN3L/logo.png"
            alt="Logo"
          />
          <div className="flex flex-row justify-center p-2  border-2 rounded-md border-[#25a18ee6] items-center">
            <User size={32} />
            <input
              className=" ml-2 border-none outline-none"
              type="text"
              name="nombre"
              placeholder="Usuario"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-row justify-center p-2 mt-5 border-2 rounded-md border-[#25a18ee6] items-center ">
            <Mail size={32} />
            <input
              className=" ml-2 border-none outline-none"
              type="email"
              name="email"
              placeholder="Correo"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-row justify-center p-2 mt-5 border-2 rounded-md border-[#25a18ee6] items-center">
            <Lock size={32} />
            <input
              className="ml-2  border-none outline-none"
              type="password"
              name="password"
              placeholder="Contraseña"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-row justify-center mt-5 p-2 border-2 rounded-md border-[#25a18ee6] items-center">
            <Lock size={32} />
            <input
              className=" ml-2 border-none outline-none"
              type="password"
              name="password2"
              placeholder="Confirmar contraseña"
              onChange={handleChange}
            />
          </div>
          <button className=" bg-[#25a18ee6] w-8/12 hover:bg-[#5cc0b1e6] duration-100 scale-105 rounded-xl py-2 px-3 mt-5 border-none cursor-pointer">
            <div className="font-poppins-bold text-[white] ] text-center ">
              Registrarse
            </div>
          </button>
          <Link href="/">
            <p className=" font-normal text-blue-500 text-lg mt-5 text-center underline">
              ¿Ya tienes cuenta? Inicia sesión
            </p>
          </Link>
          <div className=" border-t border-gray-500 "></div>
          <p className="text-xl text-center">ó</p>
          <div className=" border-t border-gray-500 "></div>
          <button
            onClick={() => {
              if (captcha) {
                const res = signIn("google");
              } else {
                alert("Ingresa el captcha");
              }
            }}
            className=" bg-[#EFEFEF] rounded-full border-none my-4 cursor-pointer"
          >
            <div className="font-poppins-bold flex flex-row justify-center items-center p-2 text-black  text-center ">
              <img
                className="w-8"
                src="https://i.ibb.co/xJRLWfJ/gugulnobg-removebg-preview.png"
                alt=""
              />
              Iniciar sesión con Google
            </div>
          </button>
        </div>
      </div>
    </form>
  );
}
///su puta madre fjadsjfasj
