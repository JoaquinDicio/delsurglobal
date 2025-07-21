import useProducts from "./hooks/useProducts";
import SliderCard from "./SliderCard";
import Spinner from "./Spinner";
import SearchBar from "./SearchBar";
import PaginationControls from "./PaginationControls";
import usePaginatedProducts from "./hooks/usePaginatedProducts";

export default function ProductsGrid({ lang = "es" }) {
  const { products, loading } = useProducts();

  const { page, maxPage, onSearch, prevPage, nextPage, displayProducts, cleanFilters } =
    usePaginatedProducts({ products, lang });

  return (
    <>
      <SearchBar lang={lang} handleSubmit={onSearch} cleanFilters={cleanFilters} />
      <div className="mt-10">
        {loading && (
          <div className="flex items-center min-h-[200px] justify-center w-full gap-3">
            <i>{lang === "es" ? "Cargando" : "Loading"}</i>
            <Spinner className={"w-[40px]"} />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6">
          {displayProducts?.map((aProduct) => (
            <SliderCard
              aProduct={{ ...aProduct[lang], imgUrl: aProduct.imgUrl }}
              key={aProduct.id}
            />
          ))}
        </div>
      </div>
      <PaginationControls
        page={page}
        maxPage={maxPage}
        prevPage={prevPage}
        nextPage={nextPage}
      />
    </>
  );
}
