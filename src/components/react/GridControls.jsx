export default function GridControls({ prevPage, nextPage }) {
    return <div className="flex gap-3">
        <button onClick={prevPage}>Anterior</button>
        <button onClick={nextPage}>Siguiente</button>
    </div>
}