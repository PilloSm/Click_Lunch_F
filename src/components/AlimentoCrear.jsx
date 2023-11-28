"use client";
import axios from "axios";
import { useRef, useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

function AlimentoForm() {
  const [numeroIteraciones, setNumeroIteraciones] = useState(1);
  const [ingredientesSeleccionados, setIngredientesSeleccionados] = useState(
    []
  );

  const [comidaN, setComidaN] = useState({
    nombre: "",
    descripcion: "",
    precio: 0,
    tipo: [],
  });
  const [datos, setDatos] = useState({
    ingrediente: [],
    tipo: "",
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

  const handleIngredientChange = (index, elemento, cambiar) => {
    const ingredienteExistente = ingredientesSeleccionados.find(
      (ingrediente) => ingrediente.index === index
    );

    if (ingredienteExistente) {
      const nuevosIngredientes = ingredientesSeleccionados.map((ingrediente) =>
        ingrediente.index === index
          ? { ...ingrediente, [cambiar]: elemento }
          : ingrediente
      );

      setIngredientesSeleccionados(nuevosIngredientes);
      console.log(ingredientesSeleccionados);
    } else {
      if (cambiar === "id_ingrediente") {
        setIngredientesSeleccionados([
          ...ingredientesSeleccionados,
          { index, id_ingrediente: elemento, cantidad: 1 },
        ]);
      } else if (cambiar === "cantidad") {
        setIngredientesSeleccionados([
          ...ingredientesSeleccionados,
          { index, id_ingrediente: "", cantidad: elemento },
        ]);
      }

      console.log(ingredientesSeleccionados);
    }
  };

  useEffect(() => {
    axios.get(`/api/apiCafeteria/ingredientes`).then((res) => {
      const { nombre, descripcion, precio, imagen, ingredientes, tipos } =
        res.data;
      console.log(res.data.ingredientes);
      setComidaN({
        nombre: nombre,
        descripcion: descripcion,
        precio: precio,
        tipo: tipos,
      });
      setDatos({
        ingrediente: ingredientes,
      });
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(ingredientesSeleccionados);
    const formData = new FormData();
    formData.append("nombre", comidaN.nombre);
    formData.append("descripcion", comidaN.descripcion);
    formData.append("precio", comidaN.precio);
    if (file) {
      formData.append("imagen", file);
    }
    formData.append("ingredientes", JSON.stringify(ingredientesSeleccionados))
    formData.append("tipos", datos.tipo);

    try {
      const resultado = await axios.post(
        "http://localhost:3000/api/apiCafeteria/Comida",
        formData,
        {
          headers: {
            "Content-type": "multipart/form-data",
          },
        }
      );
      console.log(resultado)
      form.current.reset();
      router.refresh();
      // router.push("/admin/pedidos");
    } catch (error) {
      console.log(error);
      console.error("Error al enviar la comida:", error);
    }
  };

  return (
    <div className="absolute left-[400px]">
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
        <div>
          <label>
            Número de Ingredientes:
            <input
              type="number"
              min={1}
              value={numeroIteraciones}
              onChange={(e) =>
                setNumeroIteraciones(parseInt(e.target.value, 10))
              }
            />
          </label>

          {[...Array(numeroIteraciones)].map((_, index) => (
            <div key={index}>
              <label>
                Ingrediente {index + 1}:
                <select
                  name={`select-${index}`}
                  onChange={(e) =>
                    handleIngredientChange(
                      index,
                      e.target.value,
                      "id_ingrediente"
                    )
                  }
                >
                  <option value="">Seleccionar Ingrediente</option>
                  {datos.ingrediente.map((ingrediente) => (
                    <option
                      key={ingrediente.id_ingrediente}
                      value={ingrediente.id_ingrediente}
                    >
                      {ingrediente.nombre}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Cantidad:
                <input
                  type="number"
                  name={`cantidad-${index}`} // Nombre único para cada input
                  min={1}
                  onChange={(e) =>
                    handleIngredientChange(index, e.target.value, "cantidad")
                  }
                  placeholder="Cantidad"
                />
              </label>
            </div>
          ))}
        </div>
        <select
          name="tipo"
          onChange={(e) => {
            setDatos({
              ...datos,
              [e.target.name]: e.target.value,
            });
          }}
        >
          <option value="">Seleccinart tipo</option>
          {comidaN.tipo.map((item) => (
            <option key={item.id_tipos} value={item.id_tipos}>
              {item.nombre}
            </option>
          ))}
        </select>
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
