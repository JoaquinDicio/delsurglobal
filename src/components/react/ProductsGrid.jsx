import { useEffect, useState } from "react";
import useProducts from "./hooks/useProducts";
import SliderCard from "./SliderCard";
import Spinner from "./Spinner";
import SearchBar from "./SearchBar";

export default function ProductsGrid() {
  const { products, loading } = useProducts();

  const [displayProducts, setDisplayProducts] = useState([]);

  const [searching, setSearching] = useState(false);

  useEffect(() => {
    setDisplayProducts(products);
  }, [products]);

  const onSubmit = (searchText) => {
    setSearching(true);

    const results = products.filter((product) =>
      product.es.name.toLowerCase().includes(searchText.toLowerCase())
    );

    setSearching(false);

    setDisplayProducts(results);
  };

  return (
    <>
      <SearchBar handleSubmit={onSubmit} />
      <div className="mt-10">
        {loading && (
          <div className="flex items-center min-h-[200px] justify-center w-full gap-3">
            <i>Cargando</i>
            <Spinner className={"w-[40px]"} />
          </div>
        )}

        {searching && (
          <div className="flex justify-center items-center w-full">
            <Spinner className={"max-w-[100px]"} />
          </div>
        )}

        {!loading && displayProducts.length < 1 && (
          <i>No se encontraron productos</i>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayProducts?.map((aProduct) => (
            <SliderCard aProduct={aProduct.es} key={aProduct.id} />
          ))}
        </div>
      </div>
    </>
  );
}
