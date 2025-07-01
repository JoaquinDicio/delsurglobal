export default function PaginationControls({ page, maxPage, prevPage, nextPage, lang }) {

    const isSpanish = lang === "es"

    return <div className="flex gap-3 mt-6">
        <button disabled={page === 1} className="disabled:bg-gray-200 px-2 py-1 text-sm cursor-pointer pointer rounded bg-[var(--gold-color)] text-white" onClick={prevPage}>{isSpanish ? "Anterior" : "Previous"}</button>
        <button disabled={page === maxPage} className="disabled:bg-gray-200 px-2 py-1 text-sm cursor-pointer pointer rounded bg-[var(--gold-color)] text-white" onClick={nextPage}>{isSpanish ? "Siguiente" : "Next"}</button>
    </div>
}