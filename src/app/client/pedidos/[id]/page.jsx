import TablaPedidos from "@/components/tablaPedidos";
import ValUsu from "@/components/validarUsu";

export default function ({ params }) {
  return (
    <>
    <div className="absolute top-[62px] left-[772px] font-nunito font-normal text-black text-[60px] text-center leading-normal tracking-normal">
            Pedidos
          </div>
      <ValUsu params={params.id}>
        <TablaPedidos id_cuenta={params.id} />;
      </ValUsu>
    </>
  );
}
