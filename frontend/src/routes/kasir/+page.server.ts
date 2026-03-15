import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const res = await fetch('http://localhost:3000/api/products');
  const products = await res.json();

  return { 
    products 
  };
};