import { Elysia, t } from 'elysia';
import { db } from './db';
import { products } from './schema';

const app = new Elysia()
  .get('/api/products', async () => {
    const allProducts = await db.select().from(products);
    return allProducts;
  })
  .post('/api/products', async ({ body }) => {
    const newProduct = await db.insert(products).values(body).returning();
    return newProduct;
  }, {
    body: t.Object({
      name: t.String(),
      price: t.Number(),
      stock: t.Number()
    })
  })
  .listen(3000);

console.log(`🦊 Backend Elysia jalan di http://${app.server?.hostname}:${app.server?.port}`);