import { useState } from "react";

export default function SearchBar({ handleSubmit, lang, cleanFilters }) {
  const [searchText, setSearchText] = useState("");

  const onInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(searchText);
  };

  const handleClean = () => {
    setSearchText("")
    cleanFilters();
  }

  return (
    <div className="flex justify-left">
      <form onSubmit={onSubmit} className="flex items-center w-full focus-within:outline rounded max-w-[600px] bg-[#D9D9D9] ">
        <input
          value={searchText}
          onChange={onInputChange}
          type="text"
          className="focus:outline-none px-4 py-3 w-full rounded"
          placeholder={lang == "es" ? "Alfajores" : "Product name"}
        />
        {
          searchText.length > 0 &&
          <button onClick={handleClean} className="text-xs rounded-full text-[var(--gold-color)] bg-white mr-1.5 font-bold w-[20px] h-[18px] cursor-pointer">
            X
          </button>
        }
        <button className="bg-[var(--gold-color)] px-4 py-3 rounded-r text-white">
          {lang === "es" ? "Buscar" : "Search"}
        </button>
      </form>
    </div>
  );
}
