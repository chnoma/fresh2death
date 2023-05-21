import { Postgres } from "../../../deps.ts";
import { HandlerContext } from "$fresh/server.ts";
// import { parseCookieHeader, toCookieHeader } from "../../../src/Cookies.ts";

if (!Deno.env.has("POSTGRES_ENDPOINT")) {
  throw new Error("POSTGRES_ENDPOINT environment variable not set");
}

const dbUrl = Deno.env.get("POSTGRES_ENDPOINT");
const pool = new Postgres.Pool(dbUrl, 3, true);

export async function handler(req: Request, ctx: HandlerContext) {
  const db = await pool.connect();
  const result = await db.queryObject(`SELECT * FROM post WHERE id=${ctx.params.postid}`).finally(() => db.release());
  return new Response(JSON.stringify(result.rows[0]));
}