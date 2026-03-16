import { Elysia, t } from "elysia";
import { db } from "../../../db/db";
import { products } from "../../../schema/schema";

const ProductData = new Elysia()
  .post( "/product-data", async () => {
      const allProducts = await db.select().from(products);

      return {
        status: "00",
        message: "Success",
        count: allProducts.length,
        data: allProducts
      };
    },
    {
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

export default ProductData;