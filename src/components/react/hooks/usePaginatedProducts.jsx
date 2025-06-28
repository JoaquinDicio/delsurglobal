import { useState, useEffect } from "react"

export default function usePaginatedProducts({ products, itemsPerPage = 8 }) {
    const [page, setPage] = useState(1)

    const [displayProducts, setDisplayProducts] = useState([])

    const [searchText, setSearchText] = useState(null)

    const [maxPage, setMaxPage] = useState(null)

    useEffect(() => {

        if (!products) return

        if (!searchText) setMaxPage(Math.ceil(products.length / itemsPerPage))

        const max = itemsPerPage * page

        const min = max - itemsPerPage

        // if there is a search we paginate the search results
        if (searchText) {

            const results = products.filter((product) =>
                product.es.name.toLowerCase().includes(searchText.toLowerCase()));

            setDisplayProducts(results.slice(min, max));

            setMaxPage(Math.ceil(results.length / itemsPerPage))


            return
        }

        const results = products.slice(min, max)

        setDisplayProducts(results)
    }, [page, products, searchText])

    const nextPage = () => {
        if (page == maxPage) return
        setPage(page + 1)
    }

    const prevPage = () => {
        if (page > 1) setPage(page - 1)
    }

    const onSearch = (input) => {
        setPage(1)
        setSearchText(input)
    };

    return { page, nextPage, prevPage, displayProducts, onSearch }
}