import TablaPedidos from "@/components/tablaPedidos";
import ValUsu from "@/components/validarUsu";

export default function ({ params }) {
  return (
    <>
  <div className="absolute top-[20px] md:top-[40px] lg:top-[60px] left-[50%] transform translate-x-[-50%] font-nunito font-normal text-black text-[40px] md:text-[50px] lg:text-[60px] text-center leading-normal tracking-normal">
    Pedidos
  </div>
  <ValUsu params={params.id}>
    <TablaPedidos id_cuenta={params.id} />;
  </ValUsu>
</>
  );
}
