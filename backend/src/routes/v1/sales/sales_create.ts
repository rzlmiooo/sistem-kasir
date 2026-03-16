import { Elysia, t } from "elysia";
import { db } from "../../../db/db";
import { sales, saleItems, products } from "../../../schema/schema";
import { eq } from "drizzle-orm";

const SalesCreate = new Elysia()
  .post(
    "/sales-create",
    async ({ body }) => {

      const { payment_method, items } = body;

      let total = 0;

      for (const item of items) {

        const product = await db
          .select()
          .from(products)
          .where(eq(products.id, item.product_id));

        if (!product.length) {
          throw new Error("Product not found");
        }

        total += product[0].price * item.qty;

      }

      const newSale = await db
        .insert(sales)
        .values({
          paymentMethod: payment_method,
          total: total
        })
        .returning();

      const saleId = newSale[0].id;

      for (const item of items) {

        const product = await db
          .select()
          .from(products)
          .where(eq(products.id, item.product_id));

        await db.insert(saleItems).values({
          saleId: saleId,
          productId: item.product_id,
          qty: item.qty,
          price: product[0].price
        });

        await db.update(products)
          .set({
            stock: product[0].stock - item.qty
          })
          .where(eq(products.id, item.product_id));

      }

      return {
        status: "00",
        message: "Success",
        count: 1,
        data: newSale
      };

    },
    {
      body: t.Object({
        payment_method: t.String(),
        items: t.Array(
          t.Object({
            product_id: t.Number(),
            qty: t.Number()
          })
        )
      }),
      response: {
        200: t.Object({
          status: t.String(),
          message: t.String(),
          count: t.Number(),
          data: t.Array(t.Any())
        })
      }
    }
  );

export default SalesCreate;