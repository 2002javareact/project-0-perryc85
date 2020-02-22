import { Pool } from 'pg';

export const connectionPool:Pool = new Pool({
    host:process.env['PROJECT_0_HOST'],//endpoint for db
    user:process.env['PROJECT_0_USER'],//user name
    password:process.env['PROJECT_0_PASSWORD'],//user password
    database:process.env['PROJECT_0_NAME'],//db name
    port:5432,//port for db
    max:5// max connections in free tier db 
})