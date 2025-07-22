import { useState, useEffect } from "react"
import Fuse from "fuse.js"

export default function usePaginatedProducts({ products, itemsPerPage = 8, lang = "es" }) {
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

            const fuse = new Fuse(products, {
                keys: [`${lang}.name`], // setting the key based on language
                threshold: 0.4,
                ignoreLocation: true,
            })

            const results = fuse.search(searchText).map(r => r.item)

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

    const cleanFilters = () => {
        setDisplayProducts(products)
    }

    return { maxPage, page, nextPage, prevPage, displayProducts, onSearch, cleanFilters }
}