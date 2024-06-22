import pkg from 'pg';

const { Pool } = pkg;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'stan',
    port: 5432,
    database: 'products'
})
export default pool;