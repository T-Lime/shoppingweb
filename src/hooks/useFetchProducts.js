import { useState, useEffect } from "react";

function useFetchProducts() {
  const [products, setProducts] = useState([]);
  const [isProductsLoading, setIsProductsLoading] = useState(true);
  const [isProductsError, setIsProductsError] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setIsProductsLoading(true);

        const response = await fetch("http://localhost:3000/products");

        if (!response.ok) {
          throw new Error();
        }

        const json = await response.json();

        setProducts(json);
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
