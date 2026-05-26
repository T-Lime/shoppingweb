import { useEffect, useState } from "react";

function useFetchProduct(productId) {
  const [product, setProduct] = useState(null);
  const [isProductLoading, setIsProductLoading] = useState(true);
  const [isProductError, setIsProductError] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setIsProductLoading(true);

        //`http://localhost:3000/products/${productId}?_embed=reviews`,

        const response = await fetch(
          `http://localhost:3000/products/${productId}`,
        );

        if (!response.ok) {
          throw new Error("");
        }

        const json = await response.json();

        console.log(json);

        setProduct(json);
        setIsProductLoading(false);
      } catch {
        setIsProductError(true);
        setIsProductLoading(false);
      }
    }

    fetchProduct();
  }, [productId]);

  return {
    product,
    isProductLoading,
    isProductError,
  };
}

export default useFetchProduct;
