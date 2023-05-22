import { Postgres } from "../../../deps.ts";

if (!Deno.env.has("POSTGRES_ENDPOINT")) {
  throw new Error("POSTGRES_ENDPOINT environment variable not set");
}

const dbUrl = Deno.env.get("POSTGRES_ENDPOINT");
const poolSize = Deno.env.has("POSTGRES_POOL_SIZE") ? +Deno.env.get("POSTGRES_POOL_SIZE")! : 20;

export enum QueryErrors {
  NotFound = "NOT_FOUND",
}

export const Pool = new Postgres.Pool(dbUrl, poolSize, true);
export * from './Post.ts';