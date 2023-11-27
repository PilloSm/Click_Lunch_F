"use client";
import axios from "axios";
import { useRef, useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

function AlimentoForm() {
  const [comidaN, setComidaN] = useState({
    nombre: "",
    descripcion: "",
    precio: 0,
    ingredientes: [],
    tipo: [],
  });
  const [file, setFile] = useState(null);
  const form = useRef(null);
  const router = useRouter();
  const params = useParams();

  const handleChange = (e) => {
    setComidaN({
      ...comidaN,
      [e.target.name]: e.target.value,
    });
  };

  const handleIngredientChange = (index, e) => {
    const updatedIngredientes = [...comidaN.ingredientes];
    updatedIngredientes[index][e.target.name] = e.target.value;
    setComidaN({
      ...comidaN,
      ingredientes: updatedIngredientes,
    });
  };

  useEffect(() => {
    axios.get(`/api/apiCafeteria/ingredientes`).then((res) => {
      const { nombre, descripcion, precio, imagen, ingredientes, tipo } =
        res.data;

      setComidaN({
        nombre,
        descripcion,
        precio,
        ingredientes,
        tipo,
      });
    });
  }, [params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("nombre", comidaN.nombre);
    formData.append("descripcion", comidaN.descripcion);
    formData.append("precio", comidaN.precio);

    if (file) {
      formData.append("imagen", file);
    }

    comidaN.ingredientes.forEach((ingrediente, index) => {
      formData.append(
        `ingredientes[${index}][id_ingrediente]`,
        ingrediente.id_ingrediente
      );
      formData.append(`ingredientes[${index}][cantidad]`, ingrediente.cantidad);
    });

    try {
      const res = await axios.post(
        "http://localhost:3000/api/apiCafeteria/Comida",
        formData,
        {
          headers: {
            "Content-type": "multipart/form-data",
          },
        }
      );

      console.log("Respuesta del servidor:", res.data);

      form.current.reset();
      router.refresh();
      router.push("/productos");
    } catch (error) {
      console.error("Error al enviar la comida:", error);
    }
  };

  return (
    <div className="flex ">
      <form
        className="bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
        ref={form}
      >
        <label
          htmlFor="nombre"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Nombre del Producto:
        </label>
        <input
          name="nombre"
          type="text"
          placeholder="Nombre"
          onChange={handleChange}
          value={comidaN.nombre}
          className="shadow appearance-none border rounded w-full py-2 px-3"
          autoFocus
        />

        <label
          htmlFor="descripcion"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Descripción del Producto:
        </label>
        <textarea
          name="descripcion"
          rows={3}
          placeholder="Descripción"
          onChange={handleChange}
          value={comidaN.descripcion}
          className="shadow appearance-none border rounded w-full py-2 px-3"
        />

        <label
          htmlFor="precio"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Precio del Producto:
        </label>
        <input
          name="precio"
          type="number"
          placeholder="Precio"
          onChange={handleChange}
          value={comidaN.precio}
          className="shadow appearance-none border rounded w-full py-2 px-3"
        />

        {/* Campos para ingredientes */}
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Ingredientes:
        </label>
        {comidaN.ingredientes.map((ingrediente, index) => (
          <div key={index} className="mb-2">
            <input
              type="text"
              name={`ingredientes[${index}].nombre`}
              placeholder="Nombre del ingrediente"
              value={ingrediente.nombre || ""}
              onChange={(e) => handleIngredientChange(index, e)}
              className="shadow appearance-none border rounded w-full py-2 px-3 mb-2"
            />
            <input
              type="number"
              name={`ingredientes[${index}].cantidad`}
              placeholder="Cantidad"
              value={ingrediente.cantidad || ""}
              onChange={(e) => handleIngredientChange(index, e)}
              className="shadow appearance-none border rounded w-full py-2 px-3 mb-2"
            />
          </div>
        ))}
        {/* Agregar más lógica según sea necesario */}

        <label
          htmlFor="imagen"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Imagen del Producto:
        </label>
        <input
          type="file"
          accept="img/*"
          className="shadow appearance-none border rounded w-full py-2 px-3 mb-2"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />

        {file && (
          <img
            className="w-96 object-contain mx-auto my-4"
            src={URL.createObjectURL(file)}
            alt=""
          />
        )}

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Crear Producto
        </button>
      </form>
    </div>
  );
}

export default AlimentoForm;
