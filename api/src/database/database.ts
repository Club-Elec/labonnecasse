import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";

const sqlite = new Database("database.sqlite");
export const database = drizzle(sqlite);
