import { Elysia, t } from "elysia";
import { db } from "../../../db/db";
import { sales } from "../../../schema/schema";

const SalesData = new Elysia()
  .post(
    "/sales-data",
    async () => {

      const allSales = await db.select().from(sales);

      return {
        status: "00",
        message: "Success",
        count: allSales.length,
        data: allSales
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

export default SalesData;