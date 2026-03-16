import { Elysia, t } from 'elysia';
import { db } from '../../../db/db';
import { products } from '../../../schema/schema';
import { eq } from 'drizzle-orm';

const ProductDelete = new Elysia()
    .post('/product-delete', async ({ body }) => {
        const deletedProduct = await db
            .delete(products)
            .where(eq(products.id, body.id))
            .returning();

        return {
            status: "00",
            message: "Product deleted successfully",
            data: deletedProduct
        };
    }, {
        body: t.Object({
            id: t.Number()
        })
    });

export default ProductDelete;