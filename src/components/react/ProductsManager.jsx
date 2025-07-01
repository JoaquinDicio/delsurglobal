import { useEffect, useState } from "react";
import Table from "./Table";
import AddProductModal from "./AddProductModal";
import productsService from "../../services/productsService";
import Spinner from "./Spinner";
import useProducts from "./hooks/useProducts";
import usePaginatedProducts from "./hooks/usePaginatedProducts";
import PaginationControls from "./PaginationControls";
import useProductsActions from "./hooks/useProdutcsActions";
// TODO-> MOVE SOME LOGIC TO A CUSTOM HOOK
export default function ProductsManager() {
  const [modalVisible, setModalVisible] = useState(false);

  const { products, setProducts, loading } = useProducts(); // returns the original products

  const { selected, setSelected, onProductDelete, onSubmit } = useProductsActions({ products, setProducts })

  const { page, maxPage, prevPage, nextPage, displayProducts } = usePaginatedProducts({ products, itemsPerPage: 10 })

  const toggleModal = () => {
    setSelected(null);
    setModalVisible(!modalVisible);
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
          products={displayProducts}
        />
      )}

      <PaginationControls page={page} maxPage={maxPage} prevPage={prevPage} nextPage={nextPage} />
    </div>
  );
}
