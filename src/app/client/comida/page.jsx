import FormComida from "@/components/formComida";
import BtnOpciones from "@/components/BtnOpciones";
import axios from "axios";


export default async function Comida(request) {
  const { searchParams } = request;
  const comidaId = searchParams.comida;
 
  return (

    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white w-[1440px] h-[1324px] relative">
      <div className="absolute top-[29px] h-[800px] bg-[green]">

      <FormComida comidas={comidaId} />

      </div>
      </div>
    </div>
  );
}