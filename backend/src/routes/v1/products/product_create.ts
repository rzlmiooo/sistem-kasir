import { Elysia, t } from 'elysia';
import { db } from '../../../db/db';
import { products } from '../../../schema/schema';

const ProductCreate = new Elysia()
    .post('/product-create', async ({ body }) => {
        const newProduct = await db.insert(products).values(body).returning();
        return newProduct;
        }, {
            body: t.Object 
            ({
                name: t.String(),
                price: t.Number(),
                stock: t.Number()
            })
        }
    )

export default ProductCreate