import { useState } from "react";

export default function AddProductModal({
  closeModal,
  handleSubmit,
  oldData = null,
}) {
  const [lang, setLang] = useState("es");

  const [loading, setLoading] = useState(false);

  const [success, setSucces] = useState(null);

  const [errors, setErrors] = useState(false);


  const [form, setForm] = useState(
    oldData || {
      en: { name: "", description: "" },
      es: { name: "", description: "" },
    }
  );

  // this is used to know which version is being loaded
  const onLangChange = (e) => {
    setLang(e.target.value);
  };

  const onInputChange = (e) => {

    if (e.target.type == "file") {

      // set the file prop if the input changed is the file one
      setForm((prev) => ({ ...prev, file: e.target.files[0] }));

    } else {

      const field = e.target.name;

      const value = e.target.value;

      setForm((prev) => ({
        ...prev,
        [lang]: { ...prev[lang], [field]: value },
      }));

    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const response = await handleSubmit(form, oldData);

    if (response?.ok) setSucces(true);

    if (!response?.ok) setErrors(response.error);

    setLoading(false);
  };

  return (
    <div
      data-aos="fade-up"
      className="fixed top-0 left-0 w-full h-screen flex items-center z-105 justify-center bg-black/70"
    >
      <div className="bg-white rounded max-w-[800px] w-full min-h-[700px] p-20 max-h-screen overflow-y-scroll scrollbar-none">
        <p className="text-2xl font-medium text-[var(--dark-color)]">
          Información del producto
        </p>

        <form onSubmit={onSubmit} action="">
          <div className="flex gap-3 mt-5">
            <label htmlFor="es" className="flex items-center">
              Español
              <input
                onChange={onLangChange}
                type="radio"
                checked={lang == "es"}
                name="lang"
                value={"es"}
                className="mx-1 cursor-pointer"
              />
            </label>
            <label htmlFor="en" className="flex items-center">
              Ingles
              <input
                onChange={onLangChange}
                type="radio"
                name="lang"
                checked={lang == "en"}
                value={"en"}
                className="mx-1 cursor-pointer"
              />
            </label>
          </div>

          <div className="mt-10">
            <label htmlFor="name" className="text-sm">
              Nombre del producto
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={form[lang].name}
              onChange={onInputChange}
              className="bg-gray-200 mt-1 rounded p-2 w-full"
              placeholder="Alfajor de chocolate"
              required
            />
          </div>

          <div className="mt-5">
            <label htmlFor="description" className="text-sm">
              Descripción del producto
            </label>
            <textarea
              type="text"
              id="description"
              name="description"
              value={form[lang].description}
              onChange={onInputChange}
              rows={6}
              className="bg-gray-200 mt-1 rounded p-2 w-full"
              placeholder="Alfajor de chocolate"
              required
            ></textarea>
          </div>

          <div className="mt-5 max-w-[450px]">
            <label htmlFor="name" className="text-sm">
              Portada
            </label>
            {oldData?.imgUrl && (
              <div className="w-[100px] h-[100px] rounded mb-2 bg-gray-200">
                <img
                  className="h-full object-cover w-full"
                  src={oldData?.imgUrl}
                  alt="Portada del producto"
                />
              </div>
            )}
            <input
              type="file"
              onChange={onInputChange}
              id="image"
              name="file"
              className="bg-gray-200 mt-1 rounded p-2 w-full"
            />
          </div>

          {success && (
            <i className="text-green-500 text-sm">Guardado correctamente</i>
          )}

          {errors && (
            <i className="text-red-500 text-sm">Ocurrio un error al guardar</i>
          )}

          <div className="mt-10 flex items-center gap-3">
            <input
              type="submit"
              disabled={loading}
              value={!loading ? "Guardar" : "Guardando..."}
              className="cursor-pointer disabled:bg-gray-500 mt-1 w-fit bg-[var(--gold-color)] text-white px-10 rounded py-2"
              required
            />
            <button
              onClick={closeModal}
              className="mt-1 cursor-pointer w-fit border-1 border-[var(--gold-color)] text-[var(--gold-color)] px-10 rounded py-2"
            >
              Cerrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
