import { Postgres } from "../../../../deps.ts";
import { HandlerContext } from "$fresh/server.ts";
// import { parseCookieHeader, toCookieHeader } from "../../../src/Cookies.ts";

if (!Deno.env.has("POSTGRES_ENDPOINT")) {
  throw new Error("POSTGRES_ENDPOINT environment variable not set");
}

const dbUrl = Deno.env.get("POSTGRES_ENDPOINT");
const pool = new Postgres.Pool(dbUrl, 3, true);

export async function handler(_req: Request, ctx: HandlerContext) {
  const db = await pool.connect();
  const result = await db.queryArray(`SELECT id, username, display_name FROM users WHERE id=$1`, [ctx.params.userid]).finally(() => db.release());
  return new Response(JSON.stringify({
    id: result.rows[0][0],
    username: result.rows[0][1],
    display_name: result.rows[0][2]
  }));
}