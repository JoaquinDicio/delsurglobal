import { useEffect, useState } from "react";
import Table from "./Table";
import AddProductModal from "./AddProductModal";
import productsService from "../../services/productsService";
import Spinner from "./Spinner";
import useProducts from "./hooks/useProducts";

export default function ProductsManager() {
  const [modalVisible, setModalVisible] = useState(false);

  const { products, setProducts, loading } = useProducts();

  const [selected, setSelected] = useState(null);

  const toggleModal = () => {
    setSelected(null);
    setModalVisible(!modalVisible);
  };

  const onSubmit = async (aProduct, oldData) => {
    if (oldData) {
      const response = await productsService.update(oldData.id, aProduct);

      if (response.ok) {
        const editedProduct = { id: oldData.id, ...aProduct };

        const updatedArr = products.map((product) =>
          product.id == oldData.id ? editedProduct : product
        );

        setProducts(updatedArr);
      }

      return response;
    }

    const response = await productsService.add(aProduct);

    if (!response.ok) {
      return { ok: false, error: "Algo salio mal agregando el producto" };
    }

    setProducts([...products, { id: response.doc.id, ...aProduct }]);

    return response;
  };

  const onProductDelete = async (id) => {
    const response = await productsService.delete(id);

    if (!response.ok) return;

    setProducts(products.filter((product) => product.id !== id));
  };

  const onProductEdit = (aProduct) => {
    toggleModal();
    setSelected(aProduct);
  };

  return (
    <div className="min-h-screen px-8 py-14 lg:px-24 lg:py-26 flex flex-col">
      <div className="w-full items-center justify-between flex mb-10">
        <h2 className="text-2xl font-bold text-[var(--dark-color)]">
          Listado de productos
        </h2>
        <button
          onClick={toggleModal}
          className="px-4 cursor-pointer py-2 font-light rounded-sm text-[1.15rem] border-[.15rem] text-center w-[180px] mt-4 border-[var(--gold-color)] text-white bg-[var(--gold-color)]"
        >
          Nuevo producto
        </button>
      </div>

      {modalVisible && (
        <AddProductModal
          oldData={selected}
          handleSubmit={onSubmit}
          closeModal={toggleModal}
        />
      )}

      {loading ? (
        <div className="flex items-center min-h-[200px] justify-center w-full gap-3">
          <i>Cargando</i>
          <Spinner className={"w-[40px]"} />
        </div>
      ) : (
        <Table
          handleEdit={onProductEdit}
          handleDelete={onProductDelete}
          products={products}
        />
      )}
    </div>
  );
}
