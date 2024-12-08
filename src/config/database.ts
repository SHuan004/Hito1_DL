import 'dotenv/config';
import pg from 'pg';

const { Pool } = pg;

// docker 5434
// pgadmin 5432
const connectionString = process.env.DATABASE_URL;

export const pool = new Pool({
  connectionString,
  allowExitOnIdle: true,
});
