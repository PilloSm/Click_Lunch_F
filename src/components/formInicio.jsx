"use client";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import logo from "../../public/img/index/logo.png";
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";
export default function FormInicio() {
  const { data: session } = useSession();
  const router = useRouter();
  if (session) {
    router.push("/menu");
  }
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [captcha, setCaptcha] = useState();
  const [error, setError] = useState("");
  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (captcha) {
      try {
        const res = await signIn("credentials", {
          ...credentials,
          redirect: false,
        });
        console.log(res);
        if (res?.error) setError(res.error);
        console.log(session);
        if (session) {
          console.log(session);
        }
        if (res.status === 200) router.push("/menu");
      } catch (error) {
        setError(error);
      }
    } else {
      alert("Ingresa el captcha");
    }
  };
  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white w-[1440px] h-[1324px] relative">
        <img
          className="absolute w-[322px] h-[262px] top-[85px] left-[559px]"
          src="https://i.ibb.co/g9czN3L/logo.png"
          alt="Logo"
        />
        <form className="mt-8" onSubmit={handleSubmit}>
          {error && (
            <div className="flex bg-red-400 align-baseline">{error}</div>
          )}

          <div className="absolute w-[698px] h-[113px] top-[401px] left-[371px] bg-[#f2f3f2] bg-cover">
            <img
              className="absolute w-[48px] h-[38px] top-[40px] left-[41px]"
              src="/img/index/vector.png"
              alt="Email Icon"
            />
            <input
              type="email"
              name="email"
              className="w-[500px] h-[50px] top-[30%] absolute left-[116px] text-[25px] bg-[#f2f3f2] border-none outline-none"
              placeholder="Correo"
              required
              onChange={handleChange}
            />
          </div>
          <div className="absolute w-[698px] h-[113px] top-[568px] left-[371px] bg-[#f2f3f2] bg-cover">
            <img
              className="absolute w-[62px] h-[61px] top-[23px] left-[35px]"
              src="/img/index/password-1-1.png"
              alt="Password Icon"
            />
            <input
              type="password"
              name="password"
              className="w-[500px] h-[50px] top-[30%] absolute left-[116px] text-[25px] bg-[#f2f3f2] border-none outline-none"
              placeholder="Contraseña"
              required
              onChange={handleChange}
            />
          </div>
          <button className="absolute w-[698px] h-[95px] top-[759px] left-[371px] bg-[#25a18ee6] rounded-full border-none cursor-pointer">
            <div className="absolute w-[523px] h-[20px] top-[37px] left-[87px] font-poppins-bold text-[white] text-[32px] text-center leading-[20px]">
              Iniciar sesión
            </div>
          </button>
        </form>

        <Link href="/registrar">
          <p className="absolute w-404 top-[903px] left-[540px] font-normal text-blue-500 text-2xl text-center underline">
            ¿No tienes cuenta? Regístrate
          </p>
        </Link>

        <div className="absolute w-404 top-[996px] left-[370px] border-t border-gray-500 w-[300px]"></div>
        <p className="absolute w-404 top-[983px] left-[700px] text-2xl text-center">
          ó
        </p>
        <div className="absolute w-404 top-[996px] left-[740px] border-t border-gray-500 w-[320px]"></div>
        <ReCAPTCHA
          sitekey="6LcY1x0pAAAAAJP9oTr0OHHCjlVu1ZIggttWZsYa "
          onChange={setCaptcha}
        />
        <button
          onClick={() => {
            if (captcha) {
              const res = signIn("google");
            } else {
              alert("Ingresa el captcha");
            }
          }}
          className="absolute w-[698px] h-[95px] top-[1050px] left-[371px] bg-[#EFEFEF] rounded-full border-none cursor-pointer"
        >
          <div className="absolute w-[523px] h-[20px] top-[37px] left-[87px] font-poppins-bold text-black text-[32px] text-center leading-[20px]">
            <img
              className="absolute top-[-15px] left-[-10px] w-[50px] h-[50px]"
              src="https://i.ibb.co/xJRLWfJ/gugulnobg-removebg-preview.png"
              alt=""
            />
            Iniciar sesión con Google
          </div>
        </button>
      </div>
    </div>
  );
}
