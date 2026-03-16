import type { PageServerLoad } from './$types';
import postData from '$lib/api/postData';

export const load: PageServerLoad = async () => {
  const response = await postData(
    "/api/v1/products/product-data",
    {}
  );

  const products = response.data.data;

  return {
    products
  };
};