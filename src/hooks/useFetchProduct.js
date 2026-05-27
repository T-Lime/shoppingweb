import { useEffect, useState } from "react";

function useFetchProduct(productId) {
  const [product, setProduct] = useState(null);
  const [isProductLoading, setIsProductLoading] = useState(true);
  const [isProductError, setIsProductError] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setIsProductLoading(true);

        const response = await fetch(`${import.meta.env.BASE_URL}db.json`);

        if (!response.ok) {
          throw new Error("");
        }

        const json = await response.json();

        const foundProduct = json.products.find(
          (product) => product.id === Number(productId),
        );

        setProduct(foundProduct);
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
