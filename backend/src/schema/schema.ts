import {
  pgTable,
  serial,
  text,
  integer,
  timestamp
} from 'drizzle-orm/pg-core';

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  price: integer('price').notNull(),
  stock: integer('stock').notNull().default(0),
});

export const sales = pgTable('sales', {
  id: serial('id').primaryKey(),
  paymentMethod: text('payment_method').notNull(),
  total: integer('total').notNull(),
  createdAt: timestamp('created_at').defaultNow()
});

export const saleItems = pgTable('sale_items', {
  id: serial('id').primaryKey(),

  saleId: integer('sale_id')
    .notNull(),

  productId: integer('product_id')
    .notNull(),

  qty: integer('qty')
    .notNull(),

  price: integer('price')
    .notNull()
});