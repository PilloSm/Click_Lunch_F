"use client"
import FormInicio from "@/components/formInicio";
import { signOut } from "next-auth/react";

export default function Home() {
  return <><FormInicio />
  <button className="fixed bottom-[60px] left-[60px] block no-underline bg-[#47cdb8] text-white w-[105px] h-[105px] leading-[55px] text-center rounded-full shadow-md content-center" onClick={()=>{signOut()}}><img className="mx-auto my-auto" src="https://i.ibb.co/7Kg0xvn/cerrar2.png"  alt="logo"/></button>
  <p className="fixed bottom-[-40px] left-[60px] block no-underline w-[105px] h-[105px] leading-[55px] text-center">Cerrar sesión</p>
  </>;
}
