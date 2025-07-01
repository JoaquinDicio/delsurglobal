import { useState } from "react"
import productsService from "../../../services/productsService";

export default function useProductsActions({ products, setProducts }) {
    const [selected, setSelected] = useState(null)

    const onSubmit = async (aProduct, oldData) => {

        //if there is old data that means we are editing
        if (oldData) {
            const response = await productsService.update(oldData.id, aProduct);

            if (response.ok) {
                const editedProduct = { id: oldData.id, ...aProduct };

                const updatedArr = products.map((product) =>
                    product.id == oldData.id ? editedProduct : product
                );

                setProducts(updatedArr);
            }

            return response;
        }

        const response = await productsService.add(aProduct);

        if (!response.ok) {
            return { ok: false, error: "Algo salio mal agregando el producto" };
        }

        setProducts([...products, { id: response.doc.id, ...aProduct }]);

        return response;
    };

    const onProductDelete = async (id) => {
        const response = await productsService.delete(id);

        if (!response.ok) return;

        setProducts(products.filter((product) => product.id !== id));
    };


    return { selected, setSelected, onSubmit, onProductDelete }
}