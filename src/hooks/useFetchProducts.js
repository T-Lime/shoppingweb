import { useState, useEffect } from "react";

function useFetchProducts() {
  const [products, setProducts] = useState([]);
  const [isProductsLoading, setIsProductsLoading] = useState(true);
  const [isProductsError, setIsProductsError] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setIsProductsLoading(true);

        const response = await fetch(`${import.meta.env.BASE_URL}db.json`);

        if (!response.ok) {
          throw new Error();
        }

        const json = await response.json();

        setProducts(json.products);
        setIsProductsLoading(false);
      } catch {
        setIsProductsError(true);
        setIsProductsLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return {
    products,
    isProductsLoading,
    isProductsError,
  };
}

export default useFetchProducts;
