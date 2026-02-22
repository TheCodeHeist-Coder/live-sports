import { poolClient } from './db.js';

const createUsers = `
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);
`;

export async function initDB() {
  const client = await poolClient.connect();
  try {
    await client.query(createUsers);
    console.log('Database initialized');
  } finally {
    client.release();
  }
}

// Allow running this file directly: `node src/db-init.js`
if (process.argv[1] && process.argv[1].endsWith('db-init.js')) {
  initDB()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
