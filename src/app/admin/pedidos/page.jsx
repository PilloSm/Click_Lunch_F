import Link from "next/link";
import Image from "next/image";
import CardCocina from "../../../components/CardCocina";
import BarraSuperiorAdmin from "@/components/BarraSuperiorAdmin";
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
        <BarraSuperiorAdmin />


          <div className="absolute w-[431px] top-[202px] left-[572px] font-nunito font-normal text-black text-[60px] text-center leading-normal tracking-normal">1</div>
            
            {/* Carrusel 1 */}
            <div className="top-[20px] relative w-[6000px] h-[480px] flex flex-nowrap overflow-scroll justify-start overflow-x-scroll overflow-y-hidden">
            
                  {res.data.map((detalle) => {
                <CardCocina comidas={detalle} />;
              })}
              
            </div>


            <div className="absolute w-[431px] top-[820px] left-[570px] font-nunito font-normal text-black text-[64px] text-center leading-normal tracking-normal">2</div>

            {/* Carrusel 2 */}
            <div className="top-[-30px] relative w-[6000px] h-[480px] flex flex-nowrap overflow-scroll justify-start overflow-x-scroll overflow-y-hidden">
              
              <CardCocina/>
              
            </div>

            <div className="absolute w-[431px] top-[1420px] left-[570px] font-nunito font-normal text-black text-[64px] text-center leading-normal tracking-normal">3</div>

            {/* Carrusel 3 */}
            <div className="top-[-50px] relative w-[6000px] h-[480px] flex flex-nowrap overflow-scroll justify-start overflow-x-scroll overflow-y-hidden">
            
              <CardCocina/>
              
            </div>

            <div className="absolute w-[431px] top-[2120px] left-[570px] font-nunito font-normal text-black text-[64px] text-center leading-normal tracking-normal">4</div>
            

            {/* Carrusel 4 */}
            <div className="top-[-50px] relative w-[6000px] h-[480px] flex flex-nowrap overflow-scroll justify-start overflow-x-scroll overflow-y-hidden">
              
              <CardCocina/>
              
            </div>



      </div>
    </div>
  );
}

export default Pedidos;
