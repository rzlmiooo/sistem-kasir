import { Elysia } from 'elysia';
import { db } from '../../../db/db';
import { sales } from '../../../schema/schema';
import { eq } from 'drizzle-orm';

const SalesDelete = new Elysia()

.post('/sales-delete', async ({ body }) => {

  const { id } = body as { id: number };

  await db.delete(sales)
    .where(eq(sales.id, id));

  return {
    success: true
  };

});

export default SalesDelete;