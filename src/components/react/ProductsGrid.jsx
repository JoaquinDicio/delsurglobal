import { useState } from "react";
import useProducts from "./hooks/useProducts";
import SliderCard from "./SliderCard";
import Spinner from "./Spinner";
import SearchBar from "./SearchBar";
import GridControls from "./GridControls";
import usePaginatedProducts from "./hooks/usePaginatedProducts";

export default function ProductsGrid() {
  const { products, loading } = useProducts();

  const { onSearch, prevPage, nextPage, displayProducts } = usePaginatedProducts({ products })

  return (
    <>
      <SearchBar handleSubmit={onSearch} />
      <div className="mt-10">
        {loading && (
          <div className="flex items-center min-h-[200px] justify-center w-full gap-3">
            <i>Cargando</i>
            <Spinner className={"w-[40px]"} />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayProducts?.map((aProduct) => (
            <SliderCard aProduct={aProduct.es} key={aProduct.id} />
          ))}
        </div>

        <GridControls prevPage={prevPage} nextPage={nextPage} />
      </div>
    </>
  );
}
