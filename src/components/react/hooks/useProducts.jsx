import { useEffect, useState } from "react";
import productsService from "../../../services/productsService";

export default function useProducts() {
  const [loading, setLoading] = useState(false);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);

      const response = await productsService.getAll();

      setProducts(response);
      setLoading(false);
    };

    fetchAll();
  }, []);

  return { products, loading, setProducts };
}
