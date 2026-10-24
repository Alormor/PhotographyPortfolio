import "dotenv/config";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from './schema.js';

const connectionString = process.env.DATABASE_URL;
if(!connectionString){
    throw new Error(
        "DATABASE_URL is missing. Copy .env.example to .env and add your Neon DB url"
    );
}

const client = postgres(connectionString, { max: 1 });
export const db = drizzle(client, { schema });