"use client";

import axios from "axios";

export default function CardPedidos({
  id_pedido,
  nombres_comidas,
  cantidades_detalles,
  id_cuenta,
  estado_siguiente_nombre,
  estado_actual_nombre,
  estado_actual_id,
}) {
  const handleEditar = async (e) => {
    console.log('da')
    const res = await axios.put(
      `http://localhost:3000/api/apiCafeteria/cambiarEstadoPedido/${id_pedido}`,
      { estado: estado_actual_id }
    );
    console.log(res)
  };
  const handleCancelar = async (e) => {
    console.log('sa')
    const res = await axios.post(
      `http://localhost:3000/api/apiCafeteria/cambiarEstadoPedido/${id_pedido}`,
      { estado: 1 }
    );
    console.log(res)

  };
  return (
    <div className="relative mx-2 w-[303px] h-[402px] top-[30px] cursor-pointer">
      <div className="relative h-full">
        <div className="w-[303px] h-[350px] top-[52px] bg-[#f4f5f6] rounded-[40px] shadow-md relative left-0"></div>
        <div className="absolute w-[204px] top-[249px] left-[40px] font-nunito font-normal text-black text-[28px] text-center leading-normal tracking-normal">
          {nombres_comidas}
          cantidad:{cantidades_detalles}
          <br />
          usuarios:{id_cuenta}
        </div>
        <button
          onClick={handleEditar}
          className="absolute w-[120px] h-[40px] bottom-[20px] left-[10px] bg-[#2471C9] rounded-[20px] border-none cursor-pointer leading-normal text-center flex items-center justify-center text-white text-[16px]"
        >
          <div className="pedir">{estado_siguiente_nombre}</div>
        </button>
        {estado_actual_nombre == "pedir" ? (
          <button
            onClick={handleCancelar}
            className="absolute w-[120px] h-[100px] top-[20px] left-[10px] bg-[#2471C9] rounded-[20px] border-none cursor-pointer leading-normal text-center flex items-center justify-center text-white text-[16px]"
          >
            <div className="pedir">Cancelar Pedido</div>
          </button>
        ) : (
          <p className="flex left-1px">NO</p>
        )}
      </div>
    </div>
  );
}
