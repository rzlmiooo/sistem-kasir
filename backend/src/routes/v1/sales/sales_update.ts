import { Elysia } from 'elysia';
import { db } from '../../../db/db';
import { sales } from '../../../schema/schema';
import { eq } from 'drizzle-orm';

const SalesUpdate = new Elysia()

.post('/sales-update', async ({ body }) => {

  const { id, paymentMethod } = body as {
    id: number
    paymentMethod: string
  };

  await db.update(sales)
    .set({ paymentMethod })
    .where(eq(sales.id, id));

  return {
    success: true
  };

});

export default SalesUpdate;