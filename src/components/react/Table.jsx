export default function Table({ products, handleDelete, handleEdit }) {
  if (products.length == 0 || !products)
    return (
      <div className="w-full">
        <i>Aún no hay productos</i>
      </div>
    );

  if (products.length > 0)
    return (
      <table className="w-full text-left border-separate border-spacing-y-2">
        <thead>
          <tr className="text-sm font-semibold text-gray-700">
            <th className="px-4">Nombre</th>
            <th className="px-4">Descripción</th>
            <th className="px-4 text-end">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((aProduct) => (
            <tr key={aProduct.id} className="bg-gray-200">
              <td className="px-4 py-3 rounded-l-md">{aProduct.es.name}</td>
              <td className="px-4 py-3">{aProduct.es.description}</td>
              <td className="px-4 py-3 rounded-r-md">
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => handleEdit(aProduct)}
                    className="bg-[var(--gold-color)] text-white px-3 py-1 rounded hover:opacity-90 text-sm"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(aProduct.id)}
                    className="bg-red-500 text-white px-3 py-1 cursor-pointer rounded hover:bg-red-700 text-sm"
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
}
