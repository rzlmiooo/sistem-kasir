import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const queryClient = postgres('postgres://postgres:passwordmu@localhost:5432/pos_db');
export const db = drizzle(queryClient, { schema });