import axios from "axios";
import Link from "next/link";
export default function BtonPedir({ carrito, id_cuenta, saldo }) {
  const datos = { ...carrito, id_cuenta };
  const handleSubmit = async () => {
    if (datos.total <= saldo) {
      const res = await axios.post(
        "http://localhost:3000/api/apiCliente/pedido",
        datos
      );
      if (res.error) return console.log(error);
    } else {
      alert("No tienes suficiente dinero <3");
    }
  };
  return (
    <Link href={"/client/informacion?borrar=si"}>
      <button
        onClick={handleSubmit}
        className="absolute w-[698px] h-[95px] top-[759px] left-[371px] bg-[#25a18ee6] rounded-full border-none cursor-pointer"
      >
        <div className="absolute w-[523px] h-[20px] top-[37px] left-[87px] font-poppins-bold text-[white] text-[32px] text-center leading-[20px]">
          Pedir
        </div>
      </button>
    </Link>
  );
}
