import { useState } from "react";

export default function SearchBar({ handleSubmit }) {
  const [searchText, setSearchText] = useState("");

  const onInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(searchText);
  };

  return (
    <div>
      <form onSubmit={onSubmit} className="flex items-center w-full">
        <input
          value={searchText}
          onChange={onInputChange}
          type="text"
          className="bg-[#D9D9D9] px-4 py-3 rounded-l w-full max-w-[600px]"
          placeholder="Alfajores"
        />
        <button className="bg-[var(--gold-color)] px-4 py-3 rounded-r text-white">
          Buscar
        </button>
      </form>
    </div>
  );
}
