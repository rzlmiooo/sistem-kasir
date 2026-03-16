import { Elysia, t } from 'elysia';
import { db } from '../../../db/db';
import { products } from '../../../schema/schema';
import { eq } from 'drizzle-orm';

const ProductUpdate = new Elysia()
    .post('/product-update', async ({ body }) => {
        const updatedProduct = await db
            .update(products)
            .set({
                name: body.name,
                price: body.price,
                stock: body.stock
            })
            .where(eq(products.id, body.id))
            .returning();

        return {
            status: "00",
            message: "Product updated successfully",
            data: updatedProduct
        };
    }, {
        body: t.Object({
            id: t.Number(),
            name: t.String(),
            price: t.Number(),
            stock: t.Number()
        })
    });

export default ProductUpdate;