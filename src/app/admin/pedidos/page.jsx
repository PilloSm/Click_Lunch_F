import Link from "next/link";
import Image from "next/image";
import CardPedidos from "@/components/CardPedidos";
import BarraSuperiorAdmin from "@/components/BarraSuperiorAdmin";
import axios from "axios";
import BtnOpcionesAdmin from "@/components/BtnOpcionesAdmin";
async function Pedidos() {
  const res1 = await axios.get(
    "http://localhost:3000/api/apiCafeteria/pedidos/2"
  );
  const res2 = await axios.get(
    "http://localhost:3000/api/apiCafeteria/pedidos/3"
  );
  const res3 = await axios.get(
    "http://localhost:3000/api/apiCafeteria/pedidos/4"
  );
  const res4 = await axios.get(
    "http://localhost:3000/api/apiCafeteria/pedidos/5"
  );
  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="w-[1440px] h-[1640px] flex flex-wrap justify-around bg-white relative">
        <h1>Pedidos</h1>
        <div className="absolute w-[431px] top-[202px] left-[572px] font-nunito font-normal text-black text-[60px] text-center leading-normal tracking-normal"></div>
        <div className="top-[20px] relative w-[6000px] h-[480px] flex flex-nowrap overflow-scroll justify-start overflow-x-scroll overflow-y-hidden">
          {res1.data.map((detalle) => (
            <CardPedidos
              key={detalle.id_pedido} // Agrega una clave única para cada elemento en el array
              id_pedido={detalle.id_pedido}
              nombres_comidas={detalle.nombres_comidas}
              cantidades_detalles={detalle.cantidades_detalles}
              id_cuenta={detalle.id_cuenta}
              estado_siguiente_nombre={detalle.estado_siguiente_nombre}
              estado_actual_nombre={detalle.estado_actual_nombre}
              estado_actual_id={detalle.estado_actual_id}
            />
          ))}
        </div>
        <div className="absolute w-[431px] top-[820px] left-[570px] font-nunito font-normal text-black text-[64px] text-center leading-normal tracking-normal"></div>

        <div className="top-[-30px] relative w-[6000px] h-[480px] flex flex-nowrap overflow-scroll justify-start overflow-x-scroll overflow-y-hidden">
          {res2.data.map((detalle) => {
            <CardPedidos
              key={detalle.id_pedido} // Agrega una clave única para cada elemento en el array
              nombres_comidas={detalle.nombres_comidas}
              cantidades_detalles={detalle.cantidades_detalles}
              id_cuenta={detalle.id_cuenta}
              estado_siguiente_nombre={detalle.estado_siguiente_nombre}
            />;
          })}
        </div>

        <div className="absolute w-[431px] top-[1420px] left-[570px] font-nunito font-normal text-black text-[64px] text-center leading-normal tracking-normal"></div>

        <div className="top-[-50px] relative w-[6000px] h-[480px] flex flex-nowrap overflow-scroll justify-start overflow-x-scroll overflow-y-hidden">
          {res3.data.map((detalle) => {
            <CardPedidos
              key={detalle.id_pedido} // Agrega una clave única para cada elemento en el array
              nombres_comidas={detalle.nombres_comidas}
              cantidades_detalles={detalle.cantidades_detalles}
              id_cuenta={detalle.id_cuenta}
              estado_siguiente_nombre={detalle.estado_siguiente_nombre}
            />;
          })}
        </div>

        <div className="absolute w-[431px] top-[2120px] left-[570px] font-nunito font-normal text-black text-[64px] text-center leading-normal tracking-normal"></div>

        <div className="top-[-50px] relative w-[6000px] h-[480px] flex flex-nowrap overflow-scroll justify-start overflow-x-scroll overflow-y-hidden">
          {res4.data.map((detalle) => {
            <CardPedidos
              key={detalle.id_pedido} // Agrega una clave única para cada elemento en el array
              nombres_comidas={detalle.nombres_comidas}
              cantidades_detalles={detalle.cantidades_detalles}
              id_cuenta={detalle.id_cuenta}
              estado_siguiente_nombre={detalle.estado_siguiente_nombre}
            />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Pedidos;
