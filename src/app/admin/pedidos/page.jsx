import Link from "next/link";
import Image from "next/image";
import CardCocina from "../../../components/CardCocina";
import BarraSuperior from "../../../components/BarraSuperior";
import axios from "axios";

async function Pedidos() {
  const res1 = await axios.get(
    "http://localhost:3000/api/apiCafeteria/pedidos/2"
  );
  const res2 = await axios.get(
    "http://localhost:3000/api/apiCafeteria/pedidos/3"
  );
  const re3 = await axios.get(
    "http://localhost:3000/api/apiCafeteria/pedidos/4"
  );
  const res4 = await axios.get(
    "http://localhost:3000/api/apiCafeteria/pedidos/5"
  );

  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="w-[1440px] h-[1640px] flex flex-wrap justify-around bg-white relative">
        <BarraSuperior />

        <div className="absolute top-[162px] left-[672px] font-nunito font-normal text-black text-[60px] text-center leading-normal tracking-normal">
          Pedidos
        </div>

        {res.data.map((detalle) => {
          <CardCocina comidas={detalle} />;
        })}

        <div className="top-[220px] left-[70px] relative w-full h-[1200px] flex flex-wrap overflow-scroll overflow-x-hidden overflow-y-scroll justify-start"></div>
      </div>
    </div>
  );
}

export default Pedidos;
