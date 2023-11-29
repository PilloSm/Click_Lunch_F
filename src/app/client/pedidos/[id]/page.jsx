import TablaPedidos from "@/components/tablaPedidos";
import ValUsu from "@/components/validarUsu";

export default function ({ params }) {
  return (
    <>
      <ValUsu params={params.id}>
        <TablaPedidos id_cuenta={params.id} />;
      </ValUsu>
    </>
  );
}
