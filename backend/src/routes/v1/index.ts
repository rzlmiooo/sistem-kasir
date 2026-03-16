import { Elysia } from 'elysia';

import ProductData from './products/product_data';
import ProductCreate from './products/product_create';
import ProductUpdate from './products/product_update';
import ProductDelete from './products/product_delete';

import SalesCreate from './sales/sales_create';
import SalesData from './sales/sales_data';
import SalesUpdate from './sales/sales_update';
import SalesDelete from './sales/sales_delete';

const APIv1 = new Elysia()
  .group("/products", (app) => app
    .use(ProductData)
    .use(ProductCreate)
    .use(ProductUpdate) 
    .use(ProductDelete) 
  )

  .group("/sales", (app) => app
    .use(SalesCreate)
    .use(SalesData)
    .use(SalesUpdate)
    .use(SalesDelete)
  )

export default APIv1;